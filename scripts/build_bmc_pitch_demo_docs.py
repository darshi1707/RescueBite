import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

FOREST_GREEN = RGBColor(27, 67, 50)       # #1B4332
MED_GREEN = RGBColor(45, 106, 79)         # #2D6A4F
MUTED_AMBER = RGBColor(217, 119, 6)       # #D97706
CHARCOAL = RGBColor(31, 41, 55)           # #1F2937
SLATE_GRAY = RGBColor(100, 116, 139)      # #64748B
LIGHT_BG = "F3F7F4"
ALT_ROW_BG = "F9FAF9"

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def add_title(doc, title, subtitle=None):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(title)
    run.font.name = 'Calibri'
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = FOREST_GREEN

    if subtitle:
        p2 = doc.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(14)
        run2 = p2.add_run(subtitle)
        run2.font.name = 'Calibri'
        run2.font.size = Pt(11)
        run2.font.italic = True
        run2.font.color.rgb = MUTED_AMBER

def add_heading_1(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(14)
    h.paragraph_format.space_after = Pt(4)
    h.paragraph_format.keep_with_next = True
    run = h.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = FOREST_GREEN
    return h

def add_heading_2(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(10)
    h.paragraph_format.space_after = Pt(3)
    h.paragraph_format.keep_with_next = True
    run = h.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = MED_GREEN
    return h

def add_body(doc, text, bold_prefix=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Calibri'
        r_pre.font.size = Pt(10)
        r_pre.font.bold = True
        r_pre.font.color.rgb = CHARCOAL
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(10)
    r.font.color.rgb = CHARCOAL
    return p

def add_bullet(doc, text, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Calibri'
        r_pre.font.size = Pt(10)
        r_pre.font.bold = True
        r_pre.font.color.rgb = CHARCOAL
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(10)
    r.font.color.rgb = CHARCOAL
    return p

def add_callout(doc, text, title="STRATEGIC PRINCIPLE"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    tbl.columns[0].width = Inches(6.5)
    cell = tbl.cell(0, 0)
    set_cell_background(cell, LIGHT_BG)
    set_cell_margins(cell, 100, 100, 160, 160)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    r_title = p.add_run(f"[{title}] ")
    r_title.font.name = 'Calibri'
    r_title.bold = True
    r_title.font.color.rgb = FOREST_GREEN
    r_title.font.size = Pt(9.5)
    
    r_text = p.add_run(text)
    r_text.font.name = 'Calibri'
    r_text.font.size = Pt(9.5)
    r_text.font.color.rgb = CHARCOAL
    doc.add_paragraph().paragraph_format.space_after = Pt(3)

def format_table(tbl, col_widths, headers, data):
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    hdr_cells = tbl.rows[0].cells
    for i, header_text in enumerate(headers):
        hdr_cells[i].text = header_text
        set_cell_background(hdr_cells[i], "1B4332")
        set_cell_margins(hdr_cells[i], 100, 100, 130, 130)
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        for run in p.runs:
            run.font.name = 'Calibri'
            run.font.size = Pt(9)
            run.font.bold = True
            run.font.color.rgb = RGBColor(255, 255, 255)
            
    for row_idx, row_data in enumerate(data):
        row_cells = tbl.add_row().cells
        bg_col = ALT_ROW_BG if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, cell_value in enumerate(row_data):
            row_cells[col_idx].text = str(cell_value)
            set_cell_background(row_cells[col_idx], bg_col)
            set_cell_margins(row_cells[col_idx], 80, 80, 110, 110)
            p = row_cells[col_idx].paragraphs[0]
            for run in p.runs:
                run.font.name = 'Calibri'
                run.font.size = Pt(9)
                run.font.color.rgb = CHARCOAL
                
    for row in tbl.rows:
        for i, w in enumerate(col_widths):
            row.cells[i].width = Inches(w)

def generate_bmc():
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.7)
        s.bottom_margin = Inches(0.7)
        s.left_margin = Inches(0.7)
        s.right_margin = Inches(0.7)

    add_title(doc, "RESCUEBITE: BUSINESS MODEL CANVAS", "A Three-Sided Hyperlocal Marketplace for Campus Food Rescue & Student Logistics")
    
    add_callout(doc, "Target Ecosystem: Adani University & Shantigram Township, Ahmedabad | Platform Type: Zero-Inventory Circular Economy Micro-Platform", "VENTURE SPECIFICATION")

    add_heading_1(doc, "Executive Summary of the Business Model")
    add_body(doc, "RescueBite operates as an asset-light, multi-sided marketplace aligning the economic and social incentives of three distinct campus customer groups:")
    add_bullet(doc, "University students gain immediate access to fresh, high-quality surplus meals at 40-70% discounts, significantly reducing monthly subsistence expenses.", "1. Student Buyers: ")
    add_bullet(doc, "Cafeterias and township eateries monetize food that would otherwise be discarded, recovering direct raw material and preparation costs while eliminating waste disposal overhead.", "2. Cafeterias & Vendors: ")
    add_bullet(doc, "Students with flexible timetable gaps earn direct delivery fees (₹15/delivery) within their campus perimeter, plus earn free meals via the 5-delivery daily reward milestone.", "3. Student Couriers: ")

    add_heading_1(doc, "The 9 Business Model Canvas Components")

    tbl = doc.add_table(rows=1, cols=3)
    headers = ["BMC Block", "Strategic Content & Operational Mechanism", "Key Metrics / Impact"]
    data = [
        [
            "1. Customer Segments",
            "• Tier 1: Hostellers & Day Scholars at Adani University seeking affordable daily nutrition.\n"
            "• Tier 2: Campus cafeterias, canteens, and local Shantigram restaurants with predictable perishable surpluses.\n"
            "• Tier 3: Verified students seeking flexible, non-intrusive on-campus part-time micro-earnings.",
            "3,000+ Students\n8+ Campus Eateries\n50+ Active Couriers"
        ],
        [
            "2. Value Propositions",
            "• For Students: 50% average discount on hygienic food, rapid 15-min delivery or instant counter pickup.\n"
            "• For Cafeterias: Direct incremental revenue from sunk cost inventory, zero listing fees, positive ESG branding.\n"
            "• For Couriers: ₹15 per delivery, no commercial vehicle needed (walking/bicycle), daily 5-delivery meal reward.",
            "Save ₹1,500/mo/student\nRecover ₹25,000/mo/vendor\nEarn ₹135/day/courier"
        ],
        [
            "3. Channels",
            "• Progressive Web App (mobile & desktop responsive).\n"
            "• Table-top QR codes at cafeteria counters & mess halls.\n"
            "• Student council & WhatsApp hostel notice channels.\n"
            "• Physical pickup signage and designated delivery drop bays.",
            "Direct Web Traffic\nCampus Word-of-Mouth\nHigh Organic Virality"
        ],
        [
            "4. Customer Relationships",
            "• Institutional Trust: Mandatory @adaniuni.ac.in verification ensures campus safety.\n"
            "• Transparent Real-Time Tracking: Live countdown timers, stock counters, OTP confirmations.\n"
            "• Peer Empathy: Students delivering to friends creates mutual respect and community bonding.",
            "High Retention (>75%)\nZero Fraud via OTP\n4.8/5 Avg Rating"
        ],
        [
            "5. Revenue Streams",
            "• Vendor Take-Rate: 8-10% commission on all completed food orders.\n"
            "• Delivery Coordination Fee: ₹4 fixed platform fee per delivery order.\n"
            "• Vendor Analytics Tier (Future): ₹499/mo for predictive surplus planning.\n"
            "• Township Sponsorships: ESG partner branding from sustainable corporations.",
            "8-10% Gross Margin\n₹4 Net Delivery Fee\nProfitable Unit Economics"
        ],
        [
            "6. Key Resources",
            "• Verified Student Verification Engine & Campus Auth Database.\n"
            "• Real-time inventory matching and OTP dispatch software.\n"
            "• Trusted network of certified food preparation partners.\n"
            "• Active student courier network within walking radius.",
            "Proprietary Platform\nInstitutional Domain DB\nHigh Brand Equity"
        ],
        [
            "7. Key Activities",
            "• Automated cut-off inventory publishing 60 mins before closing.\n"
            "• Verification auditing and student identity protection.\n"
            "• Instantaneous courier broadcast and OTP delivery settlement.\n"
            "• Promotional meal reward fund accounting and daily reset checks.",
            "Daily Operations\nFSSAI Hygiene Standards\nWallet Reconciliation"
        ],
        [
            "8. Key Partnerships",
            "• Adani University Administration & Food Safety Inspection Committee.\n"
            "• Shantigram Township Commercial Food Court Associations.\n"
            "• Student Activity Council (SAC) & Campus Sustainability Club.\n"
            "• Local FSSAI licensed kitchen advisors.",
            "Campus Integration\nTownship Access\nRegulatory Alignment"
        ],
        [
            "9. Cost Structure",
            "• Cloud Hosting, Database, and SSL Infrastructure (₹2,500/mo).\n"
            "• Daily Meal Reward Program Reserve (₹3/order provision).\n"
            "• Payment Gateway Simulation & Processing Fees (~1.5-2%).\n"
            "• Marketing & Campus Promotional Collateral (₹3,000/mo).",
            "Low Fixed Overhead\nVariable Cost Proportional\nBreak-Even at 35 Orders/Day"
        ]
    ]
    format_table(tbl, [1.4, 3.8, 1.3], headers, data)

    add_heading_1(doc, "Financial Sustainability Validation")
    add_body(doc, "Unlike predatory food-delivery models that impose 30% commissions and high marketing CAC, RescueBite captures value from otherwise total deadweight loss (discarded food). Since the food has already incurred fixed preparation costs, vendors welcome a 10% commission on 50% discounted sales. The student courier fee (₹15) is fully passed through, while the ₹4 platform fee and ₹6 commission generate ₹10 in platform revenue per delivery order, easily sustaining cloud costs and the promotional meal reward reserve.")

    doc.save("RESCUEBITE_BUSINESS_MODEL_CANVAS.docx")
    print("RESCUEBITE_BUSINESS_MODEL_CANVAS.docx created successfully.")

def generate_pitch():
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)

    add_title(doc, "RESCUEBITE: INVESTOR PITCH DECK", "Unlocking India's Campus Circular Economy: Affordable Dining, Zero Food Waste & Micro-Gig Logistics")
    
    add_callout(doc, "Opportunity: Seed Round / Campus Venture Pilot | Geography: Adani University & Shantigram Township -> 1,000+ Indian Campuses", "INVESTMENT MEMORANDUM")

    add_heading_1(doc, "1. The Opportunity & Market Friction")
    add_body(doc, "In India alone, higher education campuses, corporate tech parks, and residential townships host over 40 million daily consumers. Cafeterias face an intractable dilemma: over-prepare to avoid mid-service stockouts, or under-prepare and lose high-margin sales. The result is over ₹1,200 Crores of wholesome, freshly prepared food discarded annually across university and corporate canteens.")
    add_body(doc, "Simultaneously, students face rising inflation on daily subsistence, while commercial delivery apps impose high delivery fees, surges, and minimum order values. Traditional part-time jobs are unavailable or inflexible. RescueBite bridges this divide.")

    add_heading_1(doc, "2. The RescueBite Solution")
    add_body(doc, "RescueBite is the first campus-native, closed-loop food rescue and peer delivery marketplace:")
    add_bullet(doc, "Vendors post remaining wholesome stock at 40-70% discounts 60-90 minutes before closing.", "Dynamic Cut-Off Reselling: ")
    add_bullet(doc, "Students living in hostels or studying in libraries receive meals delivered by peers on bicycles or walking within 15 minutes.", "Peer Micro-Logistics: ")
    add_bullet(doc, "Student couriers completing 5 deliveries in a day earn normal delivery fees plus a ₹60 daily meal credit, creating viral participation.", "The 5-Delivery Meal Reward: ")

    add_heading_1(doc, "3. Unit Economics & Monetization Mechanics")
    add_body(doc, "Our model generates positive contribution margins from day one with zero food inventory risk and zero vehicle depreciation:")
    
    tbl = doc.add_table(rows=1, cols=3)
    headers = ["Metric / Flow", "Average Value", "Analytical Explanation"]
    data = [
        ["Average Order Value (Discounted)", "₹60.00", "50% off standard retail value of ₹120.00"],
        ["Platform Commission (10%)", "₹6.00", "Retained from cafeteria payout"],
        ["Platform Delivery Coordination Fee", "₹4.00", "Charged to buyer alongside courier fee"],
        ["Total Platform Gross Revenue", "₹10.00", "16.7% take-rate on food GMV"],
        ["Payment Gateway & SMS Infra", "₹1.60", "Simulated / live processing costs"],
        ["Meal Reward Provision (accrual)", "₹3.00", "Funds the ₹60 meal credit across 5 deliveries"],
        ["Net Platform Contribution", "₹5.40", "54% gross margin on net revenue"]
    ]
    format_table(tbl, [2.2, 1.2, 3.1], headers, data)

    add_heading_1(doc, "4. 3-Stage Financial Projections")
    add_body(doc, "Based on conservative empirical assumptions from the Adani University & Shantigram Township pilot:")
    
    p_tbl = doc.add_table(rows=1, cols=4)
    p_headers = ["Key Financial Metric", "Stage 1: Campus Pilot (5 Vendors)", "Stage 2: Township (20 Vendors)", "Stage 3: Cluster (50 Vendors)"]
    p_data = [
        ["Active Cafeterias / Eateries", "5 Vendors", "20 Vendors", "50 Vendors"],
        ["Surplus Listings per Vendor/Day", "25 Items", "30 Items", "35 Items"],
        ["Completed Orders / Day", "100 Orders", "500 Orders", "1,500 Orders"],
        ["Average Order Value (AOV)", "₹60", "₹65", "₹65"],
        ["Monthly Food GMV", "₹1,80,000", "₹9,75,000", "₹29,25,000"],
        ["Platform Commission (10%)", "₹18,000", "₹97,500", "₹2,92,500"],
        ["Delivery Coordination Fee (60% Deliv)", "₹7,200", "₹36,000", "₹1,08,000"],
        ["Total Monthly Platform Revenue", "₹25,200", "₹1,33,500", "₹4,00,500"],
        ["Meal Reward Program Expense", "₹5,400", "₹27,000", "₹81,000"],
        ["Hosting, Cloud & Verification Ops", "₹5,000", "₹18,000", "₹45,000"],
        ["Net Monthly Operating Profit", "₹14,800", "₹88,500", "₹2,74,500"]
    ]
    format_table(p_tbl, [2.1, 1.4, 1.5, 1.5], p_headers, p_data)

    add_heading_1(doc, "5. Competitive Moat & Campus Defensibility")
    add_bullet(doc, "Institutional email verification (@adaniuni.ac.in) and admin oversight restrict platform access to verified campus members, ensuring total safety and fraud immunity.", "Institutional Trust Barrier: ")
    add_bullet(doc, "Walking and bicycle deliveries within campus gates achieve 12-18 minute delivery times at ₹15 cost, which external aggregators charging ₹40-60 delivery cannot match.", "Hyperlocal Density: ")
    add_bullet(doc, "The 5-delivery meal reward turns students into loyal evangelists, ensuring couriers stay available during peak afternoon and evening dining rush hours.", "Self-Reinforcing Courier Incentive: ")

    add_heading_1(doc, "6. Investment Ask & Capital Deployment")
    add_body(doc, "RescueBite seeks ₹25 Lakhs ($30,000) in pre-seed catalytic grant or equity financing to accelerate rollout across the Ahmedabad-Gandhinagar educational corridor:")
    add_bullet(doc, "40% - Engineering & Architecture: Real-time sockets, automated FSSAI expiry sensors, mobile apps.", "Technology & Product: ")
    add_bullet(doc, "30% - Campus Ground Operations: Onboarding cafeteria point-of-sale staff, QR counter stands, courier welcome kits.", "Market Operations: ")
    add_bullet(doc, "20% - Pilot Meal Incentive Pool: Underwriting the 5-delivery reward program during the first 6 months of vendor ramp-up.", "Incentive Reserve: ")
    add_bullet(doc, "10% - Legal, Verification & Working Capital: Compliance, institutional agreements, and university MOUs.", "Compliance & Reserve: ")

    doc.save("RESCUEBITE_INVESTOR_PITCH.docx")
    print("RESCUEBITE_INVESTOR_PITCH.docx created successfully.")

def generate_demo_guide():
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)

    add_title(doc, "RESCUEBITE: PROFESSOR DEMONSTRATION GUIDE", "Step-by-Step Live Presentation Script, Demo Accounts & Evaluation Walkthrough")
    
    add_callout(doc, "Target Evaluators: Project Mentors, Startup Jury, Business Model Evaluators\nLocalhost Application URL: http://localhost:5173\nPlatform Type: Full-Stack React + Node.js + SQLite", "DEMO RUNBOOK")

    add_heading_1(doc, "1. Pre-Configured Demo Accounts")
    add_body(doc, "For a seamless presentation without tedious manual registration, use the pre-configured accounts or click the 'Quick Demo Login' badges on the login screen:")
    
    acc_tbl = doc.add_table(rows=1, cols=4)
    acc_headers = ["Role", "Email Address", "Password", "Permissions & Key Features"]
    acc_data = [
        ["Student Food Buyer", "student@adaniuni.ac.in", "student123", "Verified student badge, surplus browsing, order placement, impact metrics"],
        ["Student Delivery Partner", "delivery@adaniuni.ac.in", "delivery123", "Delivery board, pickup/OTP handover, cash wallet, 5-meal reward tracker"],
        ["Cafeteria / Vendor", "canteen@adaniuni.ac.in", "vendor123", "Add surplus food form, manage active listings, verify pickup codes, sales revenue"],
        ["Platform Administrator", "admin@rescuebite.com", "admin123", "Approve verifications, set commission % & delivery fees, audit platform metrics"]
    ]
    format_table(acc_tbl, [1.5, 2.0, 1.2, 1.8], acc_headers, acc_data)

    add_heading_1(doc, "2. Step-by-Step Live Demonstration Script")

    add_heading_2(doc, "Scenario A: The Student Discovery & Self-Pickup Journey (3 mins)")
    add_bullet(doc, "Click 'Student Login' on the top navigation bar and select the student demo account.", "Step 1: ")
    add_bullet(doc, "Show the verified student badge (@adaniuni.ac.in). Explain how institutional email domain validation maintains safety.", "Step 2: ")
    add_bullet(doc, "Navigate to the 'Marketplace'. Show category filters (Snacks, Meals, Wraps, Bakery) and price ranges.", "Step 3: ")
    add_bullet(doc, "Click on 'Veg Club Sandwich' (₹30, 50% discount). Point out the pickup cut-off time and allergen tags.", "Step 4: ")
    add_bullet(doc, "Select quantity '1' and choose 'Self-Pickup'. Click 'Confirm Reservation'. Show the generated 4-Digit Pickup PIN.", "Step 5: ")
    add_bullet(doc, "Open Vendor Dashboard in another tab, locate the order, enter the student's Pickup PIN, and mark it 'Completed'. Point out stock reduction.", "Step 6: ")

    add_heading_2(doc, "Scenario B: The Student Delivery Partner & 5-Meal Reward Journey (4 mins)")
    add_bullet(doc, "Log in as student buyer, pick 'Paneer Tikka Wrap' (₹45), and choose 'Student Delivery'. Confirm order.", "Step 1: ")
    add_bullet(doc, "Notice how the order displays an OTP requirement and triggers a delivery broadcast.", "Step 2: ")
    add_bullet(doc, "Switch to the Delivery Partner Dashboard (or log in as delivery@adaniuni.ac.in).", "Step 3: ")
    add_bullet(doc, "Go to 'Available Delivery Requests'. Show the delivery distance, estimated earning (₹15), and pickup cafeteria.", "Step 4: ")
    add_bullet(doc, "Click 'Accept Delivery'. Explain how concurrency controls prevent duplicate assignments.", "Step 5: ")
    add_bullet(doc, "Click 'Food Collected' at the cafeteria, travel to the buyer, and enter the buyer's 4-digit OTP to complete.", "Step 6: ")
    add_bullet(doc, "Open the Partner Wallet. Point out that ₹15 is added to Cash Earnings, and the Daily Meal Reward progress bar advances (e.g., 4/5 -> 5/5 unlocks the ₹60 free meal credit!).", "Step 7: ")

    add_heading_2(doc, "Scenario C: Cafeteria Vendor Operations (2 mins)")
    add_bullet(doc, "Log in as Cafeteria Vendor (canteen@adaniuni.ac.in).", "Step 1: ")
    add_bullet(doc, "Click 'Add Surplus Food'. Fill in 'Spicy Veg Burger', original ₹80, discounted ₹40, quantity 10, cut-off time.", "Step 2: ")
    add_bullet(doc, "Submit and observe it instantly appear on the public Student Marketplace.", "Step 3: ")
    add_bullet(doc, "Show recovered revenue statistics on the Vendor Overview tab.", "Step 4: ")

    add_heading_2(doc, "Scenario D: Institutional Admin & ESG Impact Dashboard (2 mins)")
    add_bullet(doc, "Switch to the Admin Dashboard (admin@rescuebite.com).", "Step 1: ")
    add_bullet(doc, "Show Pending Student Verifications. Click 'Approve' to demonstrate institutional oversight.", "Step 2: ")
    add_bullet(doc, "Show the Commission & Delivery Fee slider. Adjust platform commission from 10% to 8%.", "Step 3: ")
    add_bullet(doc, "Navigate to the Environmental Impact tab. Explain the 2.5 kg CO2e / kg food waste calculation methodology and show cumulative money saved by Adani University students.", "Step 4: ")

    add_heading_1(doc, "3. Frequently Asked Evaluation Questions & Strategic Answers")
    add_body(doc, "Q: Why won't vendors simply cook less food instead of using RescueBite?", "Question 1: ")
    add_body(doc, "Answer: Cafeteria demand varies by 15-20% daily due to weather, student attendance, exams, and event schedules. Under-cooking guarantees missed high-margin lunch sales. RescueBite provides an insurance safety net that recovers raw material costs on unavoidable surpluses without cannibalizing peak-hour full-price sales.", "Response: ")
    
    add_body(doc, "Q: How do you prevent food safety or hygiene issues?", "Question 2: ")
    add_body(doc, "Answer: Only certified university and licensed township cafeterias can publish listings. Every listing includes preparation timestamps and hard cut-off pickup windows (maximum 2 hours post-preparation). Food not collected by the deadline is delisted automatically.", "Response: ")

    add_body(doc, "Q: How is the free daily meal reward financially sustainable?", "Question 3: ")
    add_body(doc, "Answer: The courier only unlocks the ₹60 meal credit after completing 5 deliveries. Those 5 deliveries generate ₹20 in platform coordination fees plus ₹30 in cafeteria commissions (Total ₹50 platform income). Partner cafeterias supply the reward meal at 40% subsidized cost (₹36 net). The platform remains cash-flow positive.", "Response: ")

    doc.save("RESCUEBITE_DEMO_GUIDE.docx")
    print("RESCUEBITE_DEMO_GUIDE.docx created successfully.")

if __name__ == "__main__":
    generate_bmc()
    generate_pitch()
    generate_demo_guide()
