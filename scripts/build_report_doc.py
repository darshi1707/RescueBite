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
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(title)
    run.font.name = 'Calibri'
    run.font.size = Pt(22)
    run.font.bold = True
    run.font.color.rgb = FOREST_GREEN

    if subtitle:
        p2 = doc.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(16)
        run2 = p2.add_run(subtitle)
        run2.font.name = 'Calibri'
        run2.font.size = Pt(11.5)
        run2.font.italic = True
        run2.font.color.rgb = MUTED_AMBER

def add_heading_1(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(16)
    h.paragraph_format.space_after = Pt(6)
    h.paragraph_format.keep_with_next = True
    run = h.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = FOREST_GREEN
    return h

def add_heading_2(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(12)
    h.paragraph_format.space_after = Pt(4)
    h.paragraph_format.keep_with_next = True
    run = h.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.color.rgb = MED_GREEN
    return h

def add_heading_3(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(8)
    h.paragraph_format.space_after = Pt(2)
    h.paragraph_format.keep_with_next = True
    run = h.add_run(text)
    run.font.name = 'Calibri'
    run.font.size = Pt(11)
    run.font.bold = True
    run.font.color.rgb = MUTED_AMBER
    return h

def add_body(doc, text, bold_prefix=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Calibri'
        r_pre.font.size = Pt(10.5)
        r_pre.font.bold = True
        r_pre.font.color.rgb = CHARCOAL
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(10.5)
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
        r_pre.font.size = Pt(10.5)
        r_pre.font.bold = True
        r_pre.font.color.rgb = CHARCOAL
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(10.5)
    r.font.color.rgb = CHARCOAL
    return p

def add_callout(doc, text, title="STRATEGIC PRINCIPLE"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    tbl.columns[0].width = Inches(6.5)
    cell = tbl.cell(0, 0)
    set_cell_background(cell, LIGHT_BG)
    set_cell_margins(cell, 120, 120, 180, 180)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    r_title = p.add_run(f"[{title}] ")
    r_title.font.name = 'Calibri'
    r_title.bold = True
    r_title.font.color.rgb = FOREST_GREEN
    r_title.font.size = Pt(10)
    
    r_text = p.add_run(text)
    r_text.font.name = 'Calibri'
    r_text.font.size = Pt(10)
    r_text.font.color.rgb = CHARCOAL
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def format_table(tbl, col_widths, headers, data):
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    hdr_cells = tbl.rows[0].cells
    for i, header_text in enumerate(headers):
        hdr_cells[i].text = header_text
        set_cell_background(hdr_cells[i], "1B4332")
        set_cell_margins(hdr_cells[i], 120, 120, 140, 140)
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        for run in p.runs:
            run.font.name = 'Calibri'
            run.font.size = Pt(9.5)
            run.font.bold = True
            run.font.color.rgb = RGBColor(255, 255, 255)
            
    for row_idx, row_data in enumerate(data):
        row_cells = tbl.add_row().cells
        bg_col = ALT_ROW_BG if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, cell_value in enumerate(row_data):
            row_cells[col_idx].text = str(cell_value)
            set_cell_background(row_cells[col_idx], bg_col)
            set_cell_margins(row_cells[col_idx], 90, 90, 120, 120)
            p = row_cells[col_idx].paragraphs[0]
            for run in p.runs:
                run.font.name = 'Calibri'
                run.font.size = Pt(9.5)
                run.font.color.rgb = CHARCOAL
                
    for row in tbl.rows:
        for i, w in enumerate(col_widths):
            row.cells[i].width = Inches(w)

def generate_project_report():
    doc = docx.Document()
    
    # Page setup
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    add_title(doc, "RESCUEBITE: PROJECT REPORT", "Good Food. Better Prices. Less Waste.\nCampus-Based Food Rescue, Dining Equity & Student Micro-Logistics Ecosystem")
    
    add_callout(doc, 
        "Pilot Location: Adani University & Shantigram Township, Ahmedabad, Gujarat\n"
        "Business Model Classification: Three-Sided Hyperlocal Circular Economy Marketplace\n"
        "Core Ecosystem: Student Food Buyers, Cafeteria/Food Operators, Student Delivery Partners",
        "EXECUTIVE BRIEF")

    # Section 1
    add_heading_1(doc, "1. Project Title")
    add_body(doc, "RESCUEBITE: Campus-Based Food Rescue, Affordable Dining & Student Micro-Logistics Ecosystem. Tagline: 'Good Food. Better Prices. Less Waste.'")
    
    # Section 2
    add_heading_1(doc, "2. Introduction")
    add_body(doc, "Food wastage is one of the most pressing sustainability, economic, and moral challenges in modern institutional settings. Daily cafeteria operations at university campuses, residential townships, and corporate tech parks routinely prepare food to meet peak anticipated demand. However, due to variable student attendance, timetable shifts, and fluctuating weather, substantial volumes of wholesome, fresh, freshly prepared food remain unsold at the end of lunch, afternoon snack, and dinner service windows.")
    add_body(doc, "Concurrently, university students consistently face nutritional and financial pressure. Living away from home in campus hostels or nearby rental housing, students frequently seek affordable, nutritious meal choices. At the same time, many students have idle gaps between lectures and seek flexible, dignified micro-earning opportunities that do not compromise their academic commitments.")
    add_body(doc, "RescueBite is engineered as a purpose-built, campus-focused three-sided digital marketplace initially designed for Adani University and Shantigram Township, Ahmedabad. Rather than functioning simply as a discount food-reselling app, RescueBite interconnects cafeteria inventory recovery, peer student micro-logistics, and an incentive-aligned Daily Meal Reward program into a self-sustaining circular economy.")

    # Section 3
    add_heading_1(doc, "3. Problem Statement")
    add_body(doc, "The current university cafeteria operating environment suffers from three simultaneous market inefficiencies:")
    add_bullet(doc, "Campus cafeterias, canteens, and food courts discard between 12% to 22% of daily prepared meals due to unpredictable demand variations, resulting in direct financial write-offs and organic waste disposal burdens.", "1. Unsold Food Losses for Vendors: ")
    add_bullet(doc, "Standard commercial food delivery platforms charge hefty delivery markups and minimum order thresholds, making them cost-prohibitive for regular student budgets.", "2. Financial Strain on University Students: ")
    add_bullet(doc, "Formal off-campus part-time jobs are scarce, inflexible, and conflict with lecture schedules. Existing gig delivery platforms require commercial vehicle licensing, full-shift commitments, and travel outside campus perimeters.", "3. Lack of Flexible On-Campus Earning: ")

    # Section 4
    add_heading_1(doc, "4. Objectives")
    add_body(doc, "The primary strategic and operational objectives of the RescueBite platform include:")
    add_bullet(doc, "Eliminate predictable cafeteria food waste by establishing automated dynamic cut-off discount windows 60-90 minutes prior to kitchen closure.", "Food Waste Mitigation: ")
    add_bullet(doc, "Provide university students with high-quality, safe, and nutritious surplus meals at 40% to 70% discounts off original retail prices.", "Nutritional Equity: ")
    add_bullet(doc, "Create a flexible micro-delivery network where students earn direct delivery fees (₹15 per delivery) and earn free meal credits through milestone completions.", "Student Micro-Logistics: ")
    add_bullet(doc, "Operate a transparent, sustainable unit economic model with 8-10% vendor commission and a modest platform coordination fee, without relying on subsidized cash burn.", "Financial Self-Sustainability: ")
    add_bullet(doc, "Deliver measurable ESG (Environmental, Social, Governance) data, quantifying kilograms of food diverted from landfills and CO2 emissions averted.", "Environmental Stewardship: ")

    # Section 5
    add_heading_1(doc, "5. Proposed Solution")
    add_body(doc, "RescueBite delivers an integrated web platform engineered for rapid responsiveness and high institutional trust. Cafeterias publish surplus food listings with exact quantities, original and discounted prices, and pickup cut-off deadlines. Verified students browse listings in real time, reserving meals for either self-pickup or peer student delivery. Student couriers accept pending requests, collect the packaged food from cafeteria counters, and complete delivery to university hostels or common areas using a secure 4-digit OTP handover protocol.")

    # Section 6
    add_heading_1(doc, "6. How the Application Works")
    add_body(doc, "The application operational workflow comprises two distinct fulfillment paths:")
    add_heading_2(doc, "6.1 Self-Pickup Workflow")
    add_bullet(doc, "Vendor posts surplus items with stock count and cut-off time (e.g., 3:30 PM pickup deadline).", "Step 1 (Listing): ")
    add_bullet(doc, "Student selects item, specifies quantity, chooses 'Self-Pickup', and confirms reservation using simulated UPI or cash.", "Step 2 (Reservation): ")
    add_bullet(doc, "Stock is immediately decremented to prevent overselling. Vendor dashboard shows the order.", "Step 3 (Stock Lock): ")
    add_bullet(doc, "Student is issued a unique 4-digit Pickup PIN. Vendor verifies the PIN at the cafeteria counter to mark the order completed.", "Step 4 (Handover): ")
    
    add_heading_2(doc, "6.2 Student Delivery Workflow")
    add_bullet(doc, "Student chooses 'Student Delivery' at checkout. A transparent delivery fee (₹15 courier payout + ₹4 platform coordination fee) is added.", "Step 1 (Order Placement): ")
    add_bullet(doc, "The request is broadcasted to verified student delivery partners in the delivery requests tab.", "Step 2 (Courier Dispatch): ")
    add_bullet(doc, "A single available courier clicks 'Accept Delivery'. The system immediately locks the assignment to prevent duplicate acceptance.", "Step 3 (Acceptance): ")
    add_bullet(doc, "Courier travels to the cafeteria, presents the order ID, collects the safely packaged food, and marks the status as 'Food Collected'.", "Step 4 (Pickup): ")
    add_bullet(doc, "Courier delivers the food to the buyer's hostel or study wing. Buyer confirms receipt by providing a secure delivery OTP.", "Step 5 (Handover & Verification): ")
    add_bullet(doc, "The delivery fee (₹15) is instantly credited to the courier's wallet, and their daily delivery progress increments toward the 5-delivery meal reward.", "Step 6 (Settlement & Rewards): ")

    # Section 7
    add_heading_1(doc, "7. Three User Roles (+ Platform Administrator)")
    add_bullet(doc, "Enjoys access to surplus food catalog, multi-category search, allergen tags, order history, total financial savings tracker, and personal carbon impact metrics.", "Role A - Student Food Buyer: ")
    add_bullet(doc, "Voluntary opt-in ('Earn with RescueBite') for verified students. Accesses delivery broadcast board, active delivery tracker, earnings wallet (cash vs meal credits), and 5-delivery reward tracker.", "Role B - Student Delivery Partner: ")
    add_bullet(doc, "University cafeterias, mess halls, and nearby township restaurants. Add surplus food items, set cut-off deadlines, track incoming orders, verify pickup codes, and monitor recovered revenue.", "Role C - Cafeteria / Food Vendor: ")
    add_bullet(doc, "Institutional supervisor managing student credential verification, vendor authorizations, delivery partner vetting, platform commission percentages, and reward program budgets.", "Role D - Platform Administrator: ")

    # Section 8
    add_heading_1(doc, "8. University Student Verification")
    add_body(doc, "Institutional credibility and user safety are paramount. Unrestricted public registration is prohibited. RescueBite enforces strict verification protocols:")
    add_bullet(doc, "Institutional email validation against configurable university domains (e.g., @adaniuni.ac.in).", "Email Domain Enforcement: ")
    add_bullet(doc, "Collection of student enrollment/roll number, department (e.g., Computer Science, Civil, MBA), and year of study.", "Academic Metadata: ")
    add_bullet(doc, "Students receive a 'Verified Student' badge upon validation. Full student IDs are never exposed publicly to prevent identity theft.", "Badging & Privacy: ")
    add_bullet(doc, "For institutional evaluation, administrators can simulate instant approvals or test with pre-seeded verified accounts.", "MVP Demo Protocol: ")

    # Section 9
    add_heading_1(doc, "9. Food Marketplace")
    add_body(doc, "The marketplace UI is optimized for rapid decision-making before cafeteria cut-off times. Features include real-time stock counters, original vs discounted prices, discount percentages, allergen warning badges, and dietary classification (Veg, Non-Veg, Bakery, Beverages).")
    
    # Table of sample listings
    add_heading_2(doc, "Sample Marketplace Inventory (Pilot Seed Data)")
    tbl = doc.add_table(rows=1, cols=6)
    headers = ["Item Name", "Vendor", "Original", "Discounted", "Discount %", "Category"]
    data = [
        ["Veg Club Sandwich", "Adani Food Court", "₹60", "₹30", "50%", "Snacks"],
        ["Paneer Tikka Wrap", "Campus Cafe Central", "₹90", "₹45", "50%", "Wraps"],
        ["Deluxe Veg Thali", "Mess Hall Block A", "₹120", "₹60", "50%", "Meals"],
        ["Dal Khichdi Bowl", "Shantigram Eatery", "₹80", "₹40", "50%", "Bowls"],
        ["Idli Sambar Pack (4 pcs)", "South Indian Corner", "₹50", "₹25", "50%", "Breakfast"],
        ["Bakery Muffin & Puff Combo", "Pastry & Brews", "₹70", "₹35", "50%", "Bakery"]
    ]
    format_table(tbl, [1.6, 1.4, 0.7, 0.8, 0.9, 1.1], headers, data)

    # Section 10
    add_heading_1(doc, "10. Student Delivery Partner System")
    add_body(doc, "The peer delivery network transforms campus proximity into an operational advantage. Key system architecture:")
    add_bullet(doc, "Students register via the 'Earn with RescueBite' module without needing separate accounts.", "Unified Account Architecture: ")
    add_bullet(doc, "Bicycle, Two-wheeler, or Walking. Proximity dispatch matches delivery requests within a 500-1,200 meter campus perimeter.", "Modalities: ")
    add_bullet(doc, "Atomic database locks ensure that once a courier taps 'Accept', the request disappears from other couriers' boards.", "Concurrency Control: ")
    add_bullet(doc, "Buyer phone numbers and room details are masked until order acceptance, and buyer phone numbers are never made public.", "Safety & Privacy: ")

    # Section 11
    add_heading_1(doc, "11. Daily Meal Reward System")
    add_body(doc, "RescueBite introduces an innovative, financially disciplined incentive: The Daily 5-Delivery Meal Reward.")
    add_bullet(doc, "For deliveries 1 through 4, the student receives the full standard delivery fee (e.g., ₹15 per order).", "Deliveries 1 to 4: ")
    add_bullet(doc, "Upon completing the 5th verified delivery within the calendar day, the platform automatically awards a ₹60 Meal Credit voucher.", "Milestone 5: ")
    add_bullet(doc, "The student receives ₹75 in cash delivery earnings PLUS ₹60 in meal reward credit (Total compensation = ₹135).", "Cumulative Value: ")
    add_bullet(doc, "The ₹60 meal reward is a promotional expense funded by platform delivery coordination fees and vendor partnership co-op budgets. It is never deducted from the courier's base earnings.", "Financial Integrity: ")
    add_bullet(doc, "Deliveries require buyer OTP verification to prevent fake self-referrals. Uncompleted or cancelled orders do not count.", "Anti-Gaming Controls: ")

    # Section 12
    add_heading_1(doc, "12. Business Model Canvas")
    add_body(doc, "The complete Business Model Canvas integrates all three customer segments across nine structural pillars:")
    
    bmc_tbl = doc.add_table(rows=1, cols=3)
    bmc_headers = ["Building Block", "Key Elements & Operational Strategy", "Target Beneficiary"]
    bmc_data = [
        ["1. Customer Segments", "• Budget-conscious university students\n• Cafeterias/restaurants with daily unsold surplus\n• Students seeking on-campus part-time earnings", "All 3 Sides"],
        ["2. Value Propositions", "• 40-70% discount on fresh, safe surplus meals\n• Monetize perishable inventory & cut food disposal fees\n• Flexible peer micro-earnings + free daily meal rewards", "Students, Vendors, Couriers"],
        ["3. Channels", "• Mobile-responsive web platform\n• Campus QR code table tents & cafeteria displays\n• University student union WhatsApp/Telegram communities", "Campus Reach"],
        ["4. Customer Relationships", "• Verified academic community trust\n• Transparent rating & dispute resolution\n• Automated OTP verification & wallet tracking", "Trust & Retention"],
        ["5. Revenue Streams", "• 8-10% vendor commission on completed food orders\n• ₹4 platform coordination fee per delivery\n• Premium vendor analytics tier (future)\n• Sponsored institutional sustainability reporting", "RescueBite Platform"],
        ["6. Key Resources", "• Campus user verification engine\n• Real-time inventory matching software\n• University cafeteria partner network\n• Active student courier fleet", "Platform Assets"],
        ["7. Key Activities", "• Platform maintenance & security\n• Cafeteria onboarding & food safety audits\n• Delivery routing & OTP settlement\n• Promotional reward budget management", "Core Operations"],
        ["8. Key Partnerships", "• Adani University Student Affairs & Canteen Committee\n• Shantigram Township commercial restaurant operators\n• Campus sustainability clubs & FSSAI advisors", "Institutional Ecosystem"],
        ["9. Cost Structure", "• Cloud hosting & database infrastructure\n• Daily meal reward promotional fund allocation\n• Payment gateway transaction fees (~1.5%)\n• Marketing collateral & customer support", "Operational Overheads"]
    ]
    format_table(bmc_tbl, [1.4, 3.8, 1.3], bmc_headers, bmc_data)

    # Section 13
    add_heading_1(doc, "13. Revenue Model & Monetization")
    add_body(doc, "RescueBite avoids the unsustainable cash-burn traps of conventional food-tech unicorns by operating with zero food inventory, zero vehicle capital expenditure, and low customer acquisition costs.")
    add_bullet(doc, "RescueBite retains an 8-10% commission on the discounted meal price. For a ₹50 average discounted meal, commission is ₹4.50. This is pure incremental revenue for the cafeteria.", "Stream 1 - Vendor Commission: ")
    add_bullet(doc, "On delivery orders, the buyer pays ₹19 total delivery charge. ₹15 is paid directly to the student courier, and ₹4 is retained as platform coordination revenue.", "Stream 2 - Delivery Coordination Fee: ")
    add_bullet(doc, "Optional monthly subscription (₹499/month) for cafeteria managers providing predictive surplus demand forecasts, peak loss alerts, and raw material waste reduction analytics.", "Stream 3 - Vendor Analytics SaaS: ")
    add_bullet(doc, "Expanding to corporate cafeterias in Shantigram Township (e.g., Adani Corporate House, Inspire Business Park) for ESG-certified employee surplus food rescue programs.", "Stream 4 - B2B Corporate Campuses: ")

    # Section 14
    add_heading_1(doc, "14. Financial Assumptions & Unit Economics")
    add_body(doc, "Analysis of a representative single delivery order illustrates sustainable unit profitability:")
    
    unit_tbl = doc.add_table(rows=1, cols=3)
    u_headers = ["Transaction Component", "Amount (INR)", "Description / Allocation"]
    u_data = [
        ["Discounted Food Price", "₹60.00", "50% off original retail price of ₹120"],
        ["Delivery Charge (Buyer Pays)", "₹19.00", "Includes courier fee + coordination charge"],
        ["Total Invoiced to Student Buyer", "₹79.00", "Collected via simulated UPI or digital wallet"],
        ["Vendor Payout (Less 10% Commission)", "₹54.00", "Net recovered revenue for cafeteria"],
        ["Student Courier Payout", "₹15.00", "Direct income credited to courier wallet"],
        ["RescueBite Gross Revenue", "₹10.00", "₹6.00 vendor commission + ₹4.00 coordination fee"],
        ["Payment Gateway & SMS Costs (~2%)", "₹1.60", "Infrastructure transaction processing"],
        ["Daily Meal Reward Accrual Reserve", "₹3.00", "Reserve allocation toward 5-delivery reward fund"],
        ["Net Platform Contribution Margin", "₹5.40", "Positive 54% gross contribution per order"]
    ]
    format_table(unit_tbl, [2.2, 1.2, 3.1], u_headers, u_data)
    
    add_body(doc, "Reward Sustainability Principle: A courier earns the ₹60 meal reward only upon completing 5 deliveries. 5 deliveries generate 5 x ₹4.00 = ₹20.00 in platform coordination fees plus 5 x ₹6.00 = ₹30.00 in vendor commissions (Total ₹50.00 platform revenue). Combined with vendor co-op discounts (participating cafeterias provide the reward meal at 40% subsidized cost, i.e., ₹36 true cost), the reward program is 100% self-funding.")

    # Section 15
    add_heading_1(doc, "15. Environmental Impact")
    add_body(doc, "RescueBite establishes a scientifically defensible carbon accounting methodology. In accordance with the United Nations Environment Programme (UNEP) Food Waste Index and FAO lifecycle assessments:")
    add_bullet(doc, "Every 1 kg of prepared food wasted generates approximately 2.5 kg of CO2 equivalent emissions (including agricultural production, refrigeration, transportation, and landfill methane decomposition).", "Emission Factor: ")
    add_bullet(doc, "An average cafeteria meal portion is calibrated at 0.40 kg (400 grams).", "Portion Weight Standard: ")
    add_bullet(doc, "Rescuing 1 meal prevents 0.40 kg of food waste, avoiding 0.40 x 2.5 = 1.0 kg of CO2e emissions.", "Calculation: ")
    add_bullet(doc, "Diverting agricultural produce from disposal saves an estimated 380 liters of embedded fresh water per kilogram of prepared meal.", "Water Footprint Conservation: ")
    add_callout(doc, "Environmental data displayed in the RescueBite dashboard is clearly labeled as either 'Demonstration Pilot Data' or 'Empirically Audited Campus Measurements' to maintain total academic and regulatory integrity.", "METHODOLOGY NOTE")

    # Section 16
    add_heading_1(doc, "16. Implementation Plan & Milestones")
    add_bullet(doc, "Deploy RescueBite web platform with Adani University student verification, 2 campus canteens, and 15 student delivery partners. Target: 100 meals rescued per week.", "Phase 1 - Campus Pilot (Months 1-2): ")
    add_bullet(doc, "Extend to Shantigram Township food courts, residential cafeterias, and Belverdere Club eateries. Onboard 10 vendors and 40 couriers.", "Phase 2 - Township Rollout (Months 3-5): ")
    add_bullet(doc, "Scale to nearby higher-education clusters in Gandhinagar and Ahmedabad (Nirma University, PDEU, IIT Gandhinagar).", "Phase 3 - University Cluster (Months 6-10): ")
    add_bullet(doc, "National institutional roll-out across corporate tech parks and major university campuses.", "Phase 4 - Pan-India Campus Network (Year 2): ")

    # Section 17
    add_heading_1(doc, "17. Future Scope & Technological Enhancements")
    add_bullet(doc, "Machine learning models predicting cafeteria surplus volumes 24 hours in advance based on timetable data and local weather forecasts.", "AI Predictive Surplus Forecasting: ")
    add_bullet(doc, "Modular, solar-powered insulated pickup lockers installed in hostel foyers, enabling contactless delivery without waiting.", "Smart Insulated Locker Hubs: ")
    add_bullet(doc, "Personalized allergen alerts, macro-nutrient breakdowns, and hostel mess attendance syncing.", "Dietary & Health Personalization: ")
    add_bullet(doc, "Campus ESG dashboards integrated directly into Adani University's annual sustainability report and NAAC/NIRF accreditation filings.", "Institutional ESG Reporting: ")

    # Section 18
    add_heading_1(doc, "18. Conclusion")
    add_body(doc, "RescueBite proves that social impact, environmental responsibility, and commercial profitability are mutually reinforcing. By transforming what was previously treated as cafeteria waste into affordable student sustenance and dignified campus gig opportunities, RescueBite delivers a sustainable circular economy model tailored for institutional ecosystems. Its transparent economics, verified safety controls, and scalable software architecture establish RescueBite as a premier startup venture ready for seed capital and institutional deployment.")

    doc.save("RESCUEBITE_PROJECT_REPORT.docx")
    print("RESCUEBITE_PROJECT_REPORT.docx created successfully.")

if __name__ == "__main__":
    generate_project_report()
