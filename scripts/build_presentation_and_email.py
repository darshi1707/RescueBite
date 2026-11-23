import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

import docx
from docx.shared import Inches as DocxInches, Pt as DocxPt, RGBColor as DocxRGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

# ==============================================================================
# COLOR PALETTE SPECIFICATION (RescueBite Brand Identity)
# ==============================================================================
COLOR_PRIMARY     = RGBColor(23, 77, 56)     # Deep Forest Green #174D38
COLOR_DARK        = RGBColor(16, 59, 43)     # Deep Green / Header #103B2B
COLOR_LIME        = RGBColor(169, 216, 137)  # Fresh Lime Accent #A9D889
COLOR_IVORY       = RGBColor(250, 248, 242)  # Warm Ivory Background #FAF8F2
COLOR_WHITE       = RGBColor(255, 255, 255)  # Pure White #FFFFFF
COLOR_CHARCOAL    = RGBColor(32, 40, 32)     # Dark Charcoal Text #202820
COLOR_MUTED       = RGBColor(119, 125, 115)  # Muted Slate Text #777D73
COLOR_ORANGE      = RGBColor(242, 166, 90)   # Warm Orange Accent #F2A65A
COLOR_BORDER      = RGBColor(225, 229, 216)  # Subtle Card Border #E1E5D8
COLOR_LIGHT_CARD  = RGBColor(245, 247, 242)  # Soft Ivory-Green Card #F5F7F2
COLOR_DARK_CARD   = RGBColor(25, 70, 52)     # Slightly lighter dark card

FONT_HEADING = "Manrope"
FONT_BODY    = "Inter"

# Helper for fallback fonts
FALLBACK_HEADING = "Arial"
FALLBACK_BODY    = "Calibri"

def create_presentation(output_pptx_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # Blank slide layout

    # Helper: Set slide background color
    def set_slide_background(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    # Helper: Add rounded card container
    def add_card(slide, left, top, width, height, bg_color=COLOR_WHITE, border_color=COLOR_BORDER, border_width=Pt(1)):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = border_width
        else:
            shape.line.fill.background()
        return shape

    # Helper: Add standard slide header
    def add_slide_header(slide, tag_text, title_text, subtitle_text=None, is_dark=False):
        # Category Tag Pill
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(8), Inches(0.35))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.name = FONT_HEADING
        p_tag.font.size = Pt(9.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = COLOR_LIME if is_dark else COLOR_PRIMARY

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.65))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.name = FONT_HEADING
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_WHITE if is_dark else COLOR_DARK

        if subtitle_text:
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.35), Inches(11.7), Inches(0.4))
            tf_sub = sub_box.text_frame
            tf_sub.word_wrap = True
            tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_right = tf_sub.margin_bottom = 0
            p_sub = tf_sub.paragraphs[0]
            p_sub.text = subtitle_text
            p_sub.font.name = FONT_BODY
            p_sub.font.size = Pt(11)
            p_sub.font.color.rgb = COLOR_LIME if is_dark else COLOR_MUTED

    # ==============================================================================
    # SLIDE 1: TITLE SLIDE (Dark Luxury Theme - Deep Green #103B2B)
    # ==============================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, COLOR_DARK)

    # Accent decorative background band
    accent_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.1), Inches(0.08), Inches(4.8))
    accent_bar.fill.solid()
    accent_bar.fill.fore_color.rgb = COLOR_LIME
    accent_bar.line.fill.background()

    # Title content frame
    t_box = s1.shapes.add_textbox(Inches(1.2), Inches(1.0), Inches(11.2), Inches(3.6))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_top = tf1.margin_right = tf1.margin_bottom = 0

    p_subm = tf1.paragraphs[0]
    p_subm.text = "BUSINESS MODEL CANVAS (BMC) • FINAL ACADEMIC SUBMISSION"
    p_subm.font.name = FONT_HEADING
    p_subm.font.size = Pt(11)
    p_subm.font.bold = True
    p_subm.font.color.rgb = COLOR_LIME
    p_subm.space_after = Pt(10)

    p_main = tf1.add_paragraph()
    p_main.text = "RESCUEBITE"
    p_main.font.name = FONT_HEADING
    p_main.font.size = Pt(44)
    p_main.font.bold = True
    p_main.font.color.rgb = COLOR_WHITE
    p_main.space_after = Pt(4)

    p_tagline = tf1.add_paragraph()
    p_tagline.text = "Good Food. Better Prices. Less Waste."
    p_tagline.font.name = FONT_HEADING
    p_tagline.font.size = Pt(18)
    p_tagline.font.bold = True
    p_tagline.font.color.rgb = COLOR_ORANGE
    p_tagline.space_after = Pt(12)

    p_desc = tf1.add_paragraph()
    p_desc.text = "A Three-Sided Hyperlocal Campus Circular Food Economy Connecting Students, Cafeterias, and Peer Micro-Couriers at Adani University & Shantigram Township, Ahmedabad."
    p_desc.font.name = FONT_BODY
    p_desc.font.size = Pt(13)
    p_desc.font.color.rgb = RGBColor(220, 230, 222)

    # Bottom Metadata Cards
    meta_cards = [
        ("INSTITUTION", "Adani University\nAhmedabad, Gujarat"),
        ("SUBJECT", "Business Model Canvas\n(BMC - Capstone)"),
        ("VENTURE TYPE", "3-Sided Circular Economy\nZero-Inventory Marketplace"),
        ("VALIDATION", "Adani University Campus &\nShantigram Township Pilot")
    ]

    for idx, (label, val) in enumerate(meta_cards):
        col_left = Inches(1.2 + idx * 2.8)
        c_shape = add_card(s1, col_left, Inches(5.1), Inches(2.6), Inches(1.6), bg_color=COLOR_DARK_CARD, border_color=COLOR_PRIMARY)
        
        box = s1.shapes.add_textbox(col_left + Inches(0.18), Inches(5.25), Inches(2.24), Inches(1.3))
        tf_c = box.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0
        
        p_lbl = tf_c.paragraphs[0]
        p_lbl.text = label
        p_lbl.font.name = FONT_HEADING
        p_lbl.font.size = Pt(9.5)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_LIME
        p_lbl.space_after = Pt(4)
        
        p_val = tf_c.add_paragraph()
        p_val.text = val
        p_val.font.name = FONT_BODY
        p_val.font.size = Pt(10.5)
        p_val.font.color.rgb = COLOR_WHITE

    # ==============================================================================
    # SLIDE 2: THE PROBLEM STATEMENT
    # ==============================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, COLOR_IVORY)
    add_slide_header(s2, "The Market Friction", "The Tri-Fold Problem in Campus Dining", "Daily dining ecosystems suffer from three simultaneous, uncoordinated economic inefficiencies.")

    prob_cards = [
        (
            "01",
            "Cafeteria Food Waste Losses",
            "UNSOLD PERISHABLE SURPLUS",
            COLOR_ORANGE,
            [
                "Campus cafeterias face unpredictable attendance shifts (exams, weather, holidays).",
                "12% to 22% of daily prepared meals remain unsold at cut-off windows.",
                "Direct raw material write-offs and rising municipal organic disposal overhead.",
                "Over ₹1,200 Crores of wholesome food discarded annually across Indian canteens."
            ]
        ),
        (
            "02",
            "Student Cost-of-Living Inflation",
            "FINANCIAL & NUTRITIONAL STRAIN",
            COLOR_PRIMARY,
            [
                "University students operate on strict monthly allowances away from home.",
                "Standard cafeteria prices feel high during recurring month-end pinches.",
                "Commercial food delivery apps impose heavy markups, surge charges, and high minimum order caps.",
                "Nutritious, warm meals frequently compromised for cheap, processed snacks."
            ]
        ),
        (
            "03",
            "Lack of Flexible Student Work",
            "BARRIERS TO MICRO-EARNINGS",
            COLOR_DARK,
            [
                "Off-campus part-time jobs are scarce, inflexible, and conflict with lecture timetables.",
                "Existing gig platforms require commercial two-wheelers, fuel costs, and outside travel.",
                "Students have 1-2 hour timetable gaps but no viable on-campus micro-earning avenue.",
                "Lack of dignified, low-friction work opportunities within walking perimeter."
            ]
        )
    ]

    for idx, (num, title, subtitle, tag_col, bullets) in enumerate(prob_cards):
        c_left = Inches(0.8 + idx * 3.98)
        add_card(s2, c_left, Inches(1.85), Inches(3.8), Inches(4.5), bg_color=COLOR_WHITE)

        box = s2.shapes.add_textbox(c_left + Inches(0.25), Inches(2.05), Inches(3.3), Inches(4.1))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_num = tf.paragraphs[0]
        p_num.text = num
        p_num.font.name = FONT_HEADING
        p_num.font.size = Pt(24)
        p_num.font.bold = True
        p_num.font.color.rgb = tag_col

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(13.5)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_CHARCOAL
        p_t.space_before = Pt(3)

        p_sub = tf.add_paragraph()
        p_sub.text = subtitle
        p_sub.font.name = FONT_HEADING
        p_sub.font.size = Pt(9)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_MUTED
        p_sub.space_after = Pt(10)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "• " + b
            pb.font.name = FONT_BODY
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = COLOR_CHARCOAL
            pb.space_after = Pt(4)

    # Bottom Callout Banner
    bot_callout = add_card(s2, Inches(0.8), Inches(6.5), Inches(11.73), Inches(0.65), bg_color=COLOR_LIGHT_CARD, border_color=COLOR_PRIMARY)
    c_box = s2.shapes.add_textbox(Inches(1.0), Inches(6.58), Inches(11.3), Inches(0.45))
    tf_bot = c_box.text_frame
    p_b = tf_bot.paragraphs[0]
    p_b.text = "Core Takeaway: Food wastage and student dining stress exist on the same campus simultaneously because there is no coordinated, trusted marketplace connecting them."
    p_b.font.name = FONT_BODY
    p_b.font.size = Pt(10)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_PRIMARY

    # ==============================================================================
    # SLIDE 3: THE PROPOSED SOLUTION
    # ==============================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, COLOR_IVORY)
    add_slide_header(s3, "The RescueBite Architecture", "The Proposed Solution: A 3-Sided Campus Circular Ecosystem", "Aligning economic, operational, and nutritional incentives through a closed-loop platform.")

    sol_cards = [
        (
            "FOR UNIVERSITY STUDENTS",
            "Affordable Dining & Savings",
            "40%–70% Discounted Meals",
            [
                "Real-time marketplace browsing safe, wholesome cafeteria surplus before cut-off.",
                "Choose between Free Counter Pickup or ₹15 On-Campus Student Delivery.",
                "Institutional security via mandatory @adaniuni.ac.in verification.",
                "Personal impact accounting tracking financial savings and CO2e emissions avoided."
            ],
            COLOR_PRIMARY
        ),
        (
            "FOR CAMPUS CAFETERIAS",
            "Inventory Cost Recovery",
            "Monetize Sunk Food Prep Costs",
            [
                "Publish unsold items 60–90 minutes before kitchen closing in under 30 seconds.",
                "Direct incremental revenue on food that would otherwise be zero-value waste.",
                "Counter Pickup PIN verification ensures accurate, fraud-free handovers.",
                "Zero risk model: no listing fees; only a 10% commission on actual completed sales."
            ],
            COLOR_ORANGE
        ),
        (
            "FOR STUDENT COURIERS",
            "Dignified Micro-Earnings",
            "₹15 / Delivery + Free Daily Meals",
            [
                "Deliver food on bicycles or walking between lectures within campus perimeter.",
                "Zero Capex: no commercial vehicles, fuel expenses, or external road risks.",
                "Daily 5-Delivery Milestone: completing 5 trips unlocks a FREE ₹60 meal voucher.",
                "Dual-ledger wallet separating withdrawable cash earnings from cafeteria meal credits."
            ],
            COLOR_DARK
        )
    ]

    for idx, (tag, title, badge, points, col) in enumerate(sol_cards):
        c_left = Inches(0.8 + idx * 3.98)
        add_card(s3, c_left, Inches(1.85), Inches(3.8), Inches(4.5), bg_color=COLOR_WHITE)

        box = s3.shapes.add_textbox(c_left + Inches(0.25), Inches(2.05), Inches(3.3), Inches(4.1))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_tag = tf.paragraphs[0]
        p_tag.text = tag
        p_tag.font.name = FONT_HEADING
        p_tag.font.size = Pt(9.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = col

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_CHARCOAL
        p_t.space_before = Pt(2)

        p_bdg = tf.add_paragraph()
        p_bdg.text = "★ " + badge
        p_bdg.font.name = FONT_HEADING
        p_bdg.font.size = Pt(10)
        p_bdg.font.bold = True
        p_bdg.font.color.rgb = COLOR_ORANGE if col != COLOR_ORANGE else COLOR_PRIMARY
        p_bdg.space_after = Pt(12)

        for pt in points:
            pb = tf.add_paragraph()
            pb.text = "✔ " + pt
            pb.font.name = FONT_BODY
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = COLOR_CHARCOAL
            pb.space_after = Pt(5)

    # Central coordinating engine bar
    hub_card = add_card(s3, Inches(0.8), Inches(6.5), Inches(11.73), Inches(0.65), bg_color=COLOR_PRIMARY, border_color=None)
    h_box = s3.shapes.add_textbox(Inches(1.0), Inches(6.58), Inches(11.3), Inches(0.45))
    tf_hub = h_box.text_frame
    p_h = tf_hub.paragraphs[0]
    p_h.text = "THE RESCUEBITE COORDINATION ENGINE: Concurrency-Locked Dispatch  •  4-Digit OTP/PIN Verification  •  Automated Cut-Off Enforcement"
    p_h.font.name = FONT_HEADING
    p_h.font.size = Pt(9.5)
    p_h.font.bold = True
    p_h.font.color.rgb = COLOR_WHITE

    # ==============================================================================
    # SLIDE 4: TARGET CUSTOMERS & BENEFICIARIES
    # ==============================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, COLOR_IVORY)
    add_slide_header(s4, "Customer Segment Analysis", "Target Customers & Beneficiary Value Realization", "Detailed breakdown of the three market participants, their friction points, and tangible ROI.")

    # 3 Horizontal Cards
    tiers = [
        (
            "TIER 1: STUDENT FOOD BUYERS (DEMAND SIDE)",
            "Target Group: 3,000+ Undergraduates, Postgraduates & Researchers at Adani University & Shantigram Township.",
            "Pain Points Addressed: High daily subsistence expenses, repetitive hostel food fatigue, exorbitant delivery fees from off-campus aggregators.",
            "Quantified Value Realized: Direct saving of ₹1,500+ per month; access to nutritious meals in under 15 minutes; zero delivery surge pricing.",
            COLOR_PRIMARY
        ),
        (
            "TIER 2: CAFETERIA OPERATORS & VENDORS (SUPPLY SIDE)",
            "Target Group: Adani University Food Court, campus dining halls, hostel canteens, and local Shantigram commercial eateries.",
            "Pain Points Addressed: Unrecoverable sunk costs on perishable inventory; food wasted due to demand forecasting error; disposal fees.",
            "Quantified Value Realized: Recover ₹20,000 to ₹35,000 net revenue monthly; 100% incremental revenue with zero marketing or upfront listing costs.",
            COLOR_ORANGE
        ),
        (
            "TIER 3: STUDENT DELIVERY COURIERS (LOGISTICS SIDE)",
            "Target Group: Active students with timetable gaps, seeking flexible on-campus earnings without vehicle capital expenditure.",
            "Pain Points Addressed: Zero availability of on-campus part-time jobs; external delivery requires commercial vehicles and fixed long shifts.",
            "Quantified Value Realized: Earn ₹15 per delivery + ₹60 daily meal credit on 5 trips (total ₹135/day value); healthy walking/cycling micro-gig.",
            COLOR_DARK
        )
    ]

    for idx, (title, who, pain, roi, col) in enumerate(tiers):
        t_top = Inches(1.85 + idx * 1.65)
        add_card(s4, Inches(0.8), t_top, Inches(11.73), Inches(1.5), bg_color=COLOR_WHITE)

        # Left color bar
        c_bar = s4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), t_top, Inches(0.12), Inches(1.5))
        c_bar.fill.solid()
        c_bar.fill.fore_color.rgb = col
        c_bar.line.fill.background()

        box = s4.shapes.add_textbox(Inches(1.1), t_top + Inches(0.12), Inches(11.2), Inches(1.25))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.space_after = Pt(3)

        p_w = tf.add_paragraph()
        p_w.text = "• " + who
        p_w.font.name = FONT_BODY
        p_w.font.size = Pt(9.5)
        p_w.font.color.rgb = COLOR_CHARCOAL
        p_w.space_after = Pt(2)

        p_p = tf.add_paragraph()
        p_p.text = "• " + pain
        p_p.font.name = FONT_BODY
        p_p.font.size = Pt(9.5)
        p_p.font.color.rgb = COLOR_MUTED
        p_p.space_after = Pt(2)

        p_r = tf.add_paragraph()
        p_r.text = "• " + roi
        p_r.font.name = FONT_BODY
        p_r.font.size = Pt(9.5)
        p_r.font.bold = True
        p_r.font.color.rgb = COLOR_PRIMARY

    # Bottom summary
    sum_box = s4.shapes.add_textbox(Inches(0.8), Inches(6.85), Inches(11.73), Inches(0.35))
    tf_s = sum_box.text_frame
    p_s = tf_s.paragraphs[0]
    p_s.text = "Institutional Oversight: The Adani University Campus Admin validates academic credentials, audits hygiene parameters, and oversees fair platform economics."
    p_s.font.name = FONT_BODY
    p_s.font.size = Pt(9)
    p_s.font.italic = True
    p_s.font.color.rgb = COLOR_MUTED

    # ==============================================================================
    # SLIDE 5: UNIQUE VALUE PROPOSITIONS (UVP)
    # ==============================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, COLOR_IVORY)
    add_slide_header(s5, "Strategic Differentiation", "Unique Value Propositions (UVP)", "The distinctive core capabilities that make RescueBite defensible, viable, and socially impactful.")

    uvp_blocks = [
        (
            "1. NUTRITIONAL EQUITY & AFFORDABILITY",
            "50% Average Discount on Wholesome Food",
            "Students access fresh, cafeteria-grade meals at steep discounts without quality compromise. Strict cut-off timetables ensure food is served within certified safe consumption windows, directly easing student living expenses.",
            COLOR_PRIMARY
        ),
        (
            "2. ZERO-INVENTORY & ASSET-LIGHT MODEL",
            "Monetizing Sunk Losses with Zero Capex",
            "RescueBite operates without owning kitchens, warehouses, or food inventory. It captures value purely from deadweight loss—food that was already prepared and would otherwise be thrown away.",
            COLOR_ORANGE
        ),
        (
            "3. HYPERLOCAL ZERO-CAPEX LOGISTICS",
            "Walking & Bicycles within Campus Bounds",
            "Peer micro-deliveries occur strictly within the 500m–1.2km campus boundary. Eliminates fuel costs, commercial vehicle requirements, outside traffic delays, and gate security barriers.",
            COLOR_DARK
        ),
        (
            "4. THE 5-DELIVERY DAILY MEAL REWARD",
            "Gamified Courier Milestone & Viral Retention",
            "Completing 5 deliveries in a day awards ₹75 cash PLUS a free ₹60 cafeteria meal voucher (₹135 total value). This self-funding mechanism guarantees high courier availability during peak meal rush periods.",
            COLOR_PRIMARY
        )
    ]

    for idx, (header, sub, desc, col) in enumerate(uvp_blocks):
        row = idx // 2
        col_idx = idx % 2
        c_left = Inches(0.8 + col_idx * 5.95)
        c_top = Inches(1.85 + row * 2.5)

        add_card(s5, c_left, c_top, Inches(5.75), Inches(2.3), bg_color=COLOR_WHITE)

        box = s5.shapes.add_textbox(c_left + Inches(0.25), c_top + Inches(0.18), Inches(5.25), Inches(1.95))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_h = tf.paragraphs[0]
        p_h.text = header
        p_h.font.name = FONT_HEADING
        p_h.font.size = Pt(11.5)
        p_h.font.bold = True
        p_h.font.color.rgb = col

        p_s = tf.add_paragraph()
        p_s.text = sub
        p_s.font.name = FONT_HEADING
        p_s.font.size = Pt(10)
        p_s.font.bold = True
        p_s.font.color.rgb = COLOR_ORANGE if col != COLOR_ORANGE else COLOR_PRIMARY
        p_s.space_after = Pt(6)

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = COLOR_CHARCOAL

    # ==============================================================================
    # SLIDE 6: THE COMPLETE BUSINESS MODEL CANVAS (9 BLOCKS)
    # ==============================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, COLOR_IVORY)
    add_slide_header(s6, "Business Model Architecture", "The Complete Business Model Canvas (9 Building Blocks)", "Holistic strategic view mapping value creation, delivery, and economic capture.")

    # 3x3 Matrix Grid Layout for the 9 BMC Blocks
    bmc_matrix = [
        # Row 1
        ("8. KEY PARTNERS", [
            "Adani University Admin & Food Inspection Committee",
            "Shantigram Commercial Food Court Eateries",
            "Student Activity Council (SAC)",
            "FSSAI Food Safety Advisors"
        ], Inches(0.8), Inches(1.8), Inches(3.75), Inches(2.2), COLOR_DARK),

        ("7. KEY ACTIVITIES", [
            "Surplus listing publishing 60 mins before cut-off",
            "Student identity verification auditing",
            "Concurrency-locked courier dispatch",
            "Meal reward fund accounting"
        ], Inches(4.78), Inches(1.8), Inches(3.75), Inches(2.2), COLOR_PRIMARY),

        ("2. VALUE PROPOSITIONS", [
            "Students: 50% discount on fresh nutritious food",
            "Cafeterias: Sunk cost recovery; zero listing fees",
            "Couriers: ₹15 fee + daily free meal voucher",
            "Campus: Net-zero food waste & ESG metric"
        ], Inches(8.76), Inches(1.8), Inches(3.75), Inches(2.2), COLOR_ORANGE),

        # Row 2
        ("6. KEY RESOURCES", [
            "Verified Student Auth Engine (@adaniuni.ac.in)",
            "Real-time surplus matching algorithm",
            "Network of authorized campus cafeterias",
            "Student courier pool (bicycles & walking)"
        ], Inches(0.8), Inches(4.15), Inches(3.75), Inches(2.0), COLOR_PRIMARY),

        ("4. CUSTOMER RELATIONSHIPS", [
            "Institutional trust via domain auth",
            "Real-time tracking: live countdowns & OTPs",
            "Peer empathy: students serving friends",
            "Zero fraud guarantee with pickup PINs"
        ], Inches(4.78), Inches(4.15), Inches(3.75), Inches(2.0), COLOR_DARK),

        ("1. CUSTOMER SEGMENTS", [
            "Tier 1: 3,000+ Campus Hostellers & Day Scholars",
            "Tier 2: University canteens & local eateries",
            "Tier 3: Student couriers seeking micro-gigs",
            "Tier 4: Township corporate food courts (expansion)"
        ], Inches(8.76), Inches(4.15), Inches(3.75), Inches(2.0), COLOR_PRIMARY),

        # Row 3 (Bottom Financials & Channels)
        ("9. COST STRUCTURE", [
            "Cloud hosting, SQLite DB & SSL (₹2,500/mo)",
            "Daily Meal Reward Reserve (₹3/delivery allocation)",
            "Payment Gateway processing fees (~1.5–2%)",
            "Campus marketing & QR collateral (₹3,000/mo)"
        ], Inches(0.8), Inches(6.3), Inches(5.75), Inches(0.95), COLOR_MUTED),

        ("5. REVENUE STREAMS & CHANNELS", [
            "Take-Rate: 8%–10% vendor commission on food GMV",
            "Coordination Fee: ₹4 fixed platform fee per delivery",
            "Channels: Mobile PWA, mess table-top QR codes, WhatsApp batch networks"
        ], Inches(6.78), Inches(6.3), Inches(5.73), Inches(0.95), COLOR_PRIMARY)
    ]

    for title, bullets, left, top, w, h, col in bmc_matrix:
        add_card(s6, left, top, w, h, bg_color=COLOR_WHITE)

        box = s6.shapes.add_textbox(left + Inches(0.12), top + Inches(0.08), w - Inches(0.24), h - Inches(0.16))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(10)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.space_after = Pt(3)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "• " + b
            pb.font.name = FONT_BODY
            pb.font.size = Pt(8.5)
            pb.font.color.rgb = COLOR_CHARCOAL
            pb.space_after = Pt(1.5)

    # ==============================================================================
    # SLIDE 7: BMC DEEP DIVE — FRONT-STAGE (DESIRABILITY & VIABILITY)
    # ==============================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, COLOR_IVORY)
    add_slide_header(s7, "BMC Deep Dive: Front-Stage", "Customer Relationships, Channels & Revenue Streams", "How RescueBite reaches users, establishes institutional trust, and captures economic value.")

    front_cards = [
        (
            "CUSTOMER RELATIONSHIPS",
            "Institutional Trust & Security",
            COLOR_PRIMARY,
            [
                ("Institutional Domain Gate", "Mandatory @adaniuni.ac.in registration eliminates random outsiders, ensuring high community safety."),
                ("Dual-PIN Security Handover", "Self-pickup orders use a 4-digit PIN; delivery orders use a 4-digit buyer OTP. Zero parcel theft."),
                ("Peer-to-Peer Empathy", "Students delivering to classmates creates positive social capital and mutual accountability."),
                ("Transparent Timers", "Real-time stock counters and cut-off countdown clocks prevent misunderstanding or expired food handovers.")
            ]
        ),
        (
            "DISTRIBUTION CHANNELS",
            "Hyperlocal Campus Discovery",
            COLOR_ORANGE,
            [
                ("Responsive Web Platform (PWA)", "Instant access on any mobile browser or laptop without mandatory app store downloads."),
                ("Counter QR Tent Cards", "Placed across Adani University Food Court and mess tables for point-of-sale discovery."),
                ("Batch WhatsApp Networks", "Peer recommendations and hostel council broadcast groups drive zero-CAC virality."),
                ("Designated Campus Drop Bays", "Standard drop-off zones in hostel common rooms and university library reception.")
            ]
        ),
        (
            "REVENUE STREAMS",
            "High-Margin Multi-Tiered Take-Rate",
            COLOR_DARK,
            [
                ("Vendor Commission (10%)", "Monetizing surplus food sales. 10% retained from cafeteria payout (e.g. ₹6 on a ₹60 meal)."),
                ("Delivery Coordination Fee", "Fixed ₹4 platform fee per delivery order paid by the student buyer alongside courier fee."),
                ("Vendor Analytics Tier (Future)", "₹499/month for predictive kitchen prep algorithms and surplus demand forecasting."),
                ("Township ESG Sponsorships", "Corporate sponsorships for branded eco-friendly meal packaging in Shantigram.")
            ]
        )
    ]

    for idx, (title, sub, col, items) in enumerate(front_cards):
        c_left = Inches(0.8 + idx * 3.98)
        add_card(s7, c_left, Inches(1.85), Inches(3.8), Inches(5.1), bg_color=COLOR_WHITE)

        box = s7.shapes.add_textbox(c_left + Inches(0.22), Inches(2.05), Inches(3.35), Inches(4.7))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = col

        p_sub = tf.add_paragraph()
        p_sub.text = sub
        p_sub.font.name = FONT_HEADING
        p_sub.font.size = Pt(9.5)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_MUTED
        p_sub.space_after = Pt(12)

        for header_pt, body_pt in items:
            ph = tf.add_paragraph()
            ph.text = "• " + header_pt + ":"
            ph.font.name = FONT_BODY
            ph.font.size = Pt(9.5)
            ph.font.bold = True
            ph.font.color.rgb = COLOR_CHARCOAL
            ph.space_after = Pt(1)

            pb = tf.add_paragraph()
            pb.text = "  " + body_pt
            pb.font.name = FONT_BODY
            pb.font.size = Pt(9)
            pb.font.color.rgb = COLOR_MUTED
            pb.space_after = Pt(6)

    # ==============================================================================
    # SLIDE 8: BMC DEEP DIVE — BACK-STAGE (FEASIBILITY & INFRASTRUCTURE)
    # ==============================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, COLOR_IVORY)
    add_slide_header(s8, "BMC Deep Dive: Back-Stage", "Key Partnerships, Core Activities & Strategic Resources", "The operational engine ensuring hygiene, platform reliability, and unit cost control.")

    back_cards = [
        (
            "KEY PARTNERSHIPS",
            "Campus Integration & Compliance",
            COLOR_DARK,
            [
                ("University Administration", "Adani University Student Affairs Committee and Food Safety Inspection Team for institutional backing."),
                ("Township Eatery Associations", "Commercial dining outlets in Shantigram Township providing steady evening surplus capacity."),
                ("Student Activity Council (SAC)", "Student body endorsement driving courier sign-ups and environmental sustainability awareness."),
                ("FSSAI Food Quality Advisors", "Guiding food safety expiry protocols, hot-holding guidelines, and safe handover standards.")
            ]
        ),
        (
            "KEY ACTIVITIES",
            "Daily Marketplace Operations",
            COLOR_PRIMARY,
            [
                ("Automated Cut-Off Management", "Monitoring remaining food inventory and triggering dynamic discounts 60-90 min before close."),
                ("Verification & Domain Auditing", "Supervising academic email domain compliance and vetting registered food operators."),
                ("Concurrency-Locked Dispatch", "Instantaneous broadcast of delivery requests with atomic database locks preventing duplicate pickups."),
                ("Meal Reward Reconciliation", "Automated daily ledger auditing for courier cash balances and meal voucher redemptions.")
            ]
        ),
        (
            "KEY RESOURCES",
            "Proprietary Campus Assets",
            COLOR_ORANGE,
            [
                ("Institutional Auth Engine", "Configurable academic domain verification engine protecting student privacy and security."),
                ("Real-Time Inventory Software", "High-performance full-stack web engine with live stock decrementing and OTP validation."),
                ("Cafeteria Network", "Contracted, inspected kitchen counters with counter PIN verification terminals."),
                ("Student Courier Fleet", "Decentralized pool of student walkers and bicycle riders available during schedule gaps.")
            ]
        )
    ]

    for idx, (title, sub, col, items) in enumerate(back_cards):
        c_left = Inches(0.8 + idx * 3.98)
        add_card(s8, c_left, Inches(1.85), Inches(3.8), Inches(5.1), bg_color=COLOR_WHITE)

        box = s8.shapes.add_textbox(c_left + Inches(0.22), Inches(2.05), Inches(3.35), Inches(4.7))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = col

        p_sub = tf.add_paragraph()
        p_sub.text = sub
        p_sub.font.name = FONT_HEADING
        p_sub.font.size = Pt(9.5)
        p_sub.font.bold = True
        p_sub.font.color.rgb = COLOR_MUTED
        p_sub.space_after = Pt(12)

        for header_pt, body_pt in items:
            ph = tf.add_paragraph()
            ph.text = "• " + header_pt + ":"
            ph.font.name = FONT_BODY
            ph.font.size = Pt(9.5)
            ph.font.bold = True
            ph.font.color.rgb = COLOR_CHARCOAL
            ph.space_after = Pt(1)

            pb = tf.add_paragraph()
            pb.text = "  " + body_pt
            pb.font.name = FONT_BODY
            pb.font.size = Pt(9)
            pb.font.color.rgb = COLOR_MUTED
            pb.space_after = Pt(6)

    # ==============================================================================
    # SLIDE 9: OPERATIONAL WORKFLOW & CUSTOMER JOURNEY
    # ==============================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9, COLOR_IVORY)
    add_slide_header(s9, "Fulfillment Mechanics", "Operational Workflow & Customer Fulfillment Journey", "Two seamless fulfillment channels engineered for convenience, speed, and absolute handover security.")

    # Top Section: Self-Pickup Journey (4 Steps)
    add_card(s9, Inches(0.8), Inches(1.85), Inches(11.73), Inches(2.45), bg_color=COLOR_WHITE)

    b_sp_header = s9.shapes.add_textbox(Inches(1.05), Inches(1.95), Inches(11.0), Inches(0.3))
    tf_sph = b_sp_header.text_frame
    p_sph = tf_sph.paragraphs[0]
    p_sph.text = "WORKFLOW A: THE SELF-PICKUP JOURNEY (ZERO EXTRA DELIVERY COST)"
    p_sph.font.name = FONT_HEADING
    p_sph.font.size = Pt(11)
    p_sph.font.bold = True
    p_sph.font.color.rgb = COLOR_PRIMARY

    sp_steps = [
        ("Step 1: Listing", "Vendor uploads surplus 60 mins before cut-off with portion count and deadline."),
        ("Step 2: Reservation", "Student chooses dish on marketplace, selects 'Self-Pickup', and confirms order."),
        ("Step 3: Stock Lock & PIN", "Stock decrements instantly. Student receives a secure 4-Digit Pickup PIN."),
        ("Step 4: Counter Handover", "Student presents PIN at cafeteria counter. Operator enters PIN to complete handover.")
    ]

    for s_idx, (st, sd) in enumerate(sp_steps):
        s_left = Inches(1.05 + s_idx * 2.85)
        add_card(s9, s_left, Inches(2.35), Inches(2.65), Inches(1.75), bg_color=COLOR_LIGHT_CARD, border_color=COLOR_BORDER)
        
        box = s9.shapes.add_textbox(s_left + Inches(0.15), Inches(2.45), Inches(2.35), Inches(1.5))
        tf_st = box.text_frame
        tf_st.word_wrap = True
        tf_st.margin_left = tf_st.margin_top = tf_st.margin_right = tf_st.margin_bottom = 0
        
        pst = tf_st.paragraphs[0]
        pst.text = st
        pst.font.name = FONT_HEADING
        pst.font.size = Pt(10)
        pst.font.bold = True
        pst.font.color.rgb = COLOR_PRIMARY
        pst.space_after = Pt(4)
        
        psd = tf_st.add_paragraph()
        psd.text = sd
        psd.font.name = FONT_BODY
        psd.font.size = Pt(8.5)
        psd.font.color.rgb = COLOR_CHARCOAL

    # Bottom Section: Student Delivery Journey (5 Steps)
    add_card(s9, Inches(0.8), Inches(4.5), Inches(11.73), Inches(2.45), bg_color=COLOR_WHITE)

    b_del_header = s9.shapes.add_textbox(Inches(1.05), Inches(4.6), Inches(11.0), Inches(0.3))
    tf_dh = b_del_header.text_frame
    p_dh = tf_dh.paragraphs[0]
    p_dh.text = "WORKFLOW B: THE STUDENT DELIVERY JOURNEY (PEER MICRO-LOGISTICS)"
    p_dh.font.name = FONT_HEADING
    p_dh.font.size = Pt(11)
    p_dh.font.bold = True
    p_dh.font.color.rgb = COLOR_ORANGE

    del_steps = [
        ("Step 1: Order + Address", "Buyer selects delivery (+₹19 total fee) and specifies campus hostel room."),
        ("Step 2: Live Broadcast", "Request broadcasts to couriers showing pickup canteen and ₹15 payout."),
        ("Step 3: Atomic Lock", "First courier clicks 'Accept'. Concurrency lock prevents duplicate pickup."),
        ("Step 4: Canteen Pickup", "Courier collects parcel from canteen, marking status as 'Food Collected'."),
        ("Step 5: OTP Settlement", "Courier delivers to hostel. Buyer provides 4-digit OTP; ₹15 credited instantly.")
    ]

    for d_idx, (dt, dd) in enumerate(del_steps):
        d_left = Inches(1.05 + d_idx * 2.27)
        add_card(s9, d_left, Inches(5.0), Inches(2.15), Inches(1.75), bg_color=COLOR_LIGHT_CARD, border_color=COLOR_BORDER)
        
        box = s9.shapes.add_textbox(d_left + Inches(0.12), Inches(5.1), Inches(1.91), Inches(1.5))
        tf_dt = box.text_frame
        tf_dt.word_wrap = True
        tf_dt.margin_left = tf_dt.margin_top = tf_dt.margin_right = tf_dt.margin_bottom = 0
        
        pdt = tf_dt.paragraphs[0]
        pdt.text = dt
        pdt.font.name = FONT_HEADING
        pdt.font.size = Pt(9.5)
        pdt.font.bold = True
        pdt.font.color.rgb = COLOR_ORANGE
        pdt.space_after = Pt(4)
        
        pdd = tf_dt.add_paragraph()
        pdd.text = dd
        pdd.font.name = FONT_BODY
        pdd.font.size = Pt(8.5)
        pdd.font.color.rgb = COLOR_CHARCOAL

    # ==============================================================================
    # SLIDE 10: UNIT ECONOMICS & FINANCIAL SUSTAINABILITY
    # ==============================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10, COLOR_IVORY)
    add_slide_header(s10, "Unit Economics Validation", "Single Order Unit Economics & Margin Structure", "Representative order breakdown demonstrating positive unit contribution margins from day one.")

    # Left: Data Table Container
    add_card(s10, Inches(0.8), Inches(1.85), Inches(6.8), Inches(5.1), bg_color=COLOR_WHITE)
    t_box = s10.shapes.add_textbox(Inches(1.05), Inches(2.0), Inches(6.3), Inches(0.4))
    tf_th = t_box.text_frame
    p_th = tf_th.paragraphs[0]
    p_th.text = "REPRESENTATIVE DELIVERY ORDER BREAKDOWN (₹60 MEAL VALUE)"
    p_th.font.name = FONT_HEADING
    p_th.font.size = Pt(11)
    p_th.font.bold = True
    p_th.font.color.rgb = COLOR_PRIMARY

    # Add Table
    rows = 8
    cols = 3
    table_shape = s10.shapes.add_table(rows, cols, Inches(1.05), Inches(2.45), Inches(6.3), Inches(4.2))
    table = table_shape.table
    table.columns[0].width = Inches(3.2)
    table.columns[1].width = Inches(1.1)
    table.columns[2].width = Inches(2.0)

    econ_data = [
        ("Financial Flow Component", "Amount", "Analytical Purpose"),
        ("Original Retail Price (Benchmark)", "₹120.00", "Full cafeteria list price"),
        ("Discounted Meal Price (50% Off)", "₹60.00", "Food cost charged to student"),
        ("Delivery Charge (Buyer Invoiced)", "₹19.00", "₹15 courier + ₹4 platform"),
        ("Total Invoiced to Student Buyer", "₹79.00", "Total transaction cash-in"),
        ("Vendor Net Payout (10% Comm.)", "₹54.00", "Direct incremental recovery"),
        ("Student Courier Payout", "₹15.00", "100% passed through to wallet"),
        ("RescueBite Gross Revenue", "₹10.00", "₹6.00 comm + ₹4.00 coord fee")
    ]

    for r_idx, (c0, c1, c2) in enumerate(econ_data):
        cell0 = table.cell(r_idx, 0)
        cell1 = table.cell(r_idx, 1)
        cell2 = table.cell(r_idx, 2)
        
        cell0.text = c0
        cell1.text = c1
        cell2.text = c2

        for cell in (cell0, cell1, cell2):
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            for p in cell.text_frame.paragraphs:
                p.font.name = FONT_BODY
                p.font.size = Pt(8.5)
                if r_idx == 0:
                    p.font.name = FONT_HEADING
                    p.font.bold = True
                    p.font.color.rgb = COLOR_WHITE
                elif r_idx in (4, 7):
                    p.font.bold = True
                    p.font.color.rgb = COLOR_PRIMARY
                else:
                    p.font.color.rgb = COLOR_CHARCOAL
        
        if r_idx == 0:
            cell0.fill.solid(); cell0.fill.fore_color.rgb = COLOR_PRIMARY
            cell1.fill.solid(); cell1.fill.fore_color.rgb = COLOR_PRIMARY
            cell2.fill.solid(); cell2.fill.fore_color.rgb = COLOR_PRIMARY

    # Right: Unit Margin & Reserve Analysis Cards
    right_cards = [
        (
            "GROSS CONTRIBUTION MARGIN",
            "₹5.40 Net per Order (54% Margin)",
            "From the ₹10.00 platform gross revenue, ₹1.60 covers payment gateway simulation and serverless infrastructure, while ₹3.00 is allocated to the Meal Reward Reserve. The platform retains ₹5.40 net contribution.",
            COLOR_PRIMARY
        ),
        (
            "THE 5-DELIVERY MEAL REWARD MATH",
            "Self-Funding Promotional Incentive",
            "5 deliveries generate ₹50 platform revenue (₹20 coordination fees + ₹30 vendor commissions). The ₹60 reward voucher costs the platform only ₹36 net (canteen supplies at 40% subsidized discount). Cash-flow positive!",
            COLOR_ORANGE
        ),
        (
            "BREAK-EVEN VELOCITY",
            "35 Orders / Day to Cover Overheads",
            "Fixed operational costs (hosting, DB upkeep, campus marketing) equal ~₹5,500/month. At ₹5.40 net contribution per order, break-even is achieved at only 35 orders/day on a 3,000-student campus.",
            COLOR_DARK
        )
    ]

    for idx, (head, sub, desc, col) in enumerate(right_cards):
        r_top = Inches(1.85 + idx * 1.7)
        add_card(s10, Inches(7.8), r_top, Inches(4.73), Inches(1.55), bg_color=COLOR_WHITE)

        box = s10.shapes.add_textbox(Inches(8.0), r_top + Inches(0.12), Inches(4.33), Inches(1.3))
        tf_r = box.text_frame
        tf_r.word_wrap = True
        tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

        p_h = tf_r.paragraphs[0]
        p_h.text = head
        p_h.font.name = FONT_HEADING
        p_h.font.size = Pt(10.5)
        p_h.font.bold = True
        p_h.font.color.rgb = col

        p_s = tf_r.add_paragraph()
        p_s.text = sub
        p_s.font.name = FONT_HEADING
        p_s.font.size = Pt(9.5)
        p_s.font.bold = True
        p_s.font.color.rgb = COLOR_CHARCOAL
        p_s.space_after = Pt(3)

        p_d = tf_r.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = COLOR_MUTED

    # ==============================================================================
    # SLIDE 11: 3-STAGE FINANCIAL PROJECTIONS
    # ==============================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11, COLOR_IVORY)
    add_slide_header(s11, "Growth & Projections", "3-Stage Scalability & Financial Projections", "Empirically validated rollout trajectory from single campus pilot to regional university cluster.")

    # Table Container
    add_card(s11, Inches(0.8), Inches(1.85), Inches(11.73), Inches(4.2), bg_color=COLOR_WHITE)

    # 3-Stage Financial Table
    rows = 10
    cols = 4
    proj_table = s11.shapes.add_table(rows, cols, Inches(1.0), Inches(2.0), Inches(11.33), Inches(3.9)).table
    proj_table.columns[0].width = Inches(3.53)
    proj_table.columns[1].width = Inches(2.6)
    proj_table.columns[2].width = Inches(2.6)
    proj_table.columns[3].width = Inches(2.6)

    proj_data = [
        ("Key Operating Metric", "Stage 1: Campus Pilot", "Stage 2: Township Expansion", "Stage 3: University Cluster"),
        ("Active Cafeteria Partners", "5 Canteens (Adani Uni)", "20 Eateries (Shantigram)", "50 Eateries (Ahmedabad-GNR)"),
        ("Surplus Listings / Vendor / Day", "25 Meals", "30 Meals", "35 Meals"),
        ("Completed Orders per Day", "100 Orders / Day", "500 Orders / Day", "1,500 Orders / Day"),
        ("Average Order Value (AOV)", "₹60.00", "₹65.00", "₹65.00"),
        ("Monthly Food GMV", "₹1,80,000", "₹9,75,000", "₹29,25,000"),
        ("Platform Revenue (Comm. + Fees)", "₹25,200 / Month", "₹1,33,500 / Month", "₹4,00,500 / Month"),
        ("Meal Reward Reserve Allocation", "₹5,400 / Month", "₹27,000 / Month", "₹81,000 / Month"),
        ("Cloud, DB & Verification Ops", "₹5,000 / Month", "₹18,000 / Month", "₹45,000 / Month"),
        ("Net Operating Profit (Margin %)", "₹14,800 / Mo (58.7%)", "₹88,500 / Mo (66.3%)", "₹2,74,500 / Mo (68.5%)")
    ]

    for r_idx, row in enumerate(proj_data):
        for c_idx, val in enumerate(row):
            cell = proj_table.cell(r_idx, c_idx)
            cell.text = val
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            p = cell.text_frame.paragraphs[0]
            p.font.name = FONT_BODY
            p.font.size = Pt(9)
            if r_idx == 0:
                p.font.name = FONT_HEADING
                p.font.bold = True
                p.font.color.rgb = COLOR_WHITE
                cell.fill.solid(); cell.fill.fore_color.rgb = COLOR_DARK
            elif r_idx == 9:
                p.font.name = FONT_HEADING
                p.font.bold = True
                p.font.color.rgb = COLOR_PRIMARY
                cell.fill.solid(); cell.fill.fore_color.rgb = COLOR_LIGHT_CARD
            else:
                p.font.color.rgb = COLOR_CHARCOAL if c_idx == 0 else COLOR_PRIMARY

    # Bottom 3 Insight Pills
    pills = [
        ("Stage 1 Focus", "Establish behavioral habit on Adani campus; perfect counter PIN and OTP speed."),
        ("Stage 2 Focus", "Scale into Shantigram commercial food hubs; onboard residential family couriers."),
        ("Stage 3 Focus", "Replicate model across 15 universities in the Ahmedabad-Gandhinagar educational belt.")
    ]

    for idx, (p_title, p_desc) in enumerate(pills):
        c_left = Inches(0.8 + idx * 3.98)
        add_card(s11, c_left, Inches(6.2), Inches(3.8), Inches(0.95), bg_color=COLOR_WHITE)

        box = s11.shapes.add_textbox(c_left + Inches(0.15), Inches(6.25), Inches(3.5), Inches(0.85))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        pt = tf.paragraphs[0]
        pt.text = p_title
        pt.font.name = FONT_HEADING
        pt.font.size = Pt(10)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_PRIMARY

        pd = tf.add_paragraph()
        pd.text = p_desc
        pd.font.name = FONT_BODY
        pd.font.size = Pt(8.5)
        pd.font.color.rgb = COLOR_MUTED

    # ==============================================================================
    # SLIDE 12: COMPETITIVE ADVANTAGE & STRATEGIC MOAT
    # ==============================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12, COLOR_IVORY)
    add_slide_header(s12, "Strategic Moat", "Competitive Advantage & Campus Defensibility", "Why external commercial delivery aggregators cannot replicate or undermine RescueBite.")

    moats = [
        (
            "1. INSTITUTIONAL TRUST BARRIER",
            "Gated University Domain Authentication",
            COLOR_PRIMARY,
            [
                "Restricting buyer and courier accounts to verified @adaniuni.ac.in credentials creates absolute campus safety.",
                "External food apps cannot verify student status or grant exclusive student subsidies.",
                "Official administrative and student council endorsement protects campus exclusivity."
            ]
        ),
        (
            "2. HYPERLOCAL TRANSIT & DENSITY",
            "12-18 Minute Delivery without Road Traffic",
            COLOR_ORANGE,
            [
                "Deliveries take place strictly within the campus perimeter on foot or bicycles.",
                "Couriers walk straight through security gates and directly up to hostel rooms.",
                "External delivery riders face campus entry gates, visitor badges, and parking bottlenecks."
            ]
        ),
        (
            "3. ZERO VEHICLE CAPEX & LOW TAKE-RATE",
            "Sustainable 10% vs Aggregator 30% Commission",
            COLOR_DARK,
            [
                "Commercial food apps take 25%–35% commission and charge ₹40–₹70 in delivery surges.",
                "RescueBite charges just 10% commission and a fixed ₹19 delivery charge (₹15 to student).",
                "Asset-light courier model has zero fleet depreciation or fuel sensitivity."
            ]
        ),
        (
            "4. THE REWARD FLYWHEEL RETENTION",
            "Gamified Courier Supply Guarantee",
            COLOR_PRIMARY,
            [
                "The 5-delivery daily milestone solves the primary failure point of micro-logistics: courier drop-off.",
                "Students actively complete trips between classes to earn their free evening meal.",
                "Creates self-reinforcing network effects: higher courier density drives faster delivery."
            ]
        )
    ]

    for idx, (title, sub, col, bullets) in enumerate(moats):
        row = idx // 2
        col_idx = idx % 2
        c_left = Inches(0.8 + col_idx * 5.95)
        c_top = Inches(1.85 + row * 2.5)

        add_card(s12, c_left, c_top, Inches(5.75), Inches(2.3), bg_color=COLOR_WHITE)

        box = s12.shapes.add_textbox(c_left + Inches(0.22), c_top + Inches(0.18), Inches(5.31), Inches(1.95))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = col

        p_s = tf.add_paragraph()
        p_s.text = sub
        p_s.font.name = FONT_HEADING
        p_s.font.size = Pt(9.5)
        p_s.font.bold = True
        p_s.font.color.rgb = COLOR_ORANGE if col != COLOR_ORANGE else COLOR_PRIMARY
        p_s.space_after = Pt(6)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "• " + b
            pb.font.name = FONT_BODY
            pb.font.size = Pt(8.5)
            pb.font.color.rgb = COLOR_CHARCOAL
            pb.space_after = Pt(2.5)

    # ==============================================================================
    # SLIDE 13: ENVIRONMENTAL IMPACT, ESG & FUTURE VISION (Dark Theme)
    # ==============================================================================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_background(s13, COLOR_DARK)
    add_slide_header(s13, "Measurable Impact & Roadmap", "Environmental Accounting, UN SDGs & Future Scope", "Transforming surplus food into quantified carbon mitigation, dining equity, and scalable campus value.", is_dark=True)

    # Top Section: UNEP Impact Metrics (4 Cards)
    impact_metrics = [
        ("1.0 kg CO2e", "Averted per Rescued Meal", "UNEP Food Waste Index standard: 2.5 kg CO2e / kg food diverted."),
        ("380 Liters", "Water Conserved per kg", "Preserving embedded agricultural irrigation and cold-chain water."),
        ("₹1,500+", "Monthly Student Savings", "Direct subsistence financial relief across undergraduate student cohorts."),
        ("₹30,000+", "Monthly Vendor Recovery", "Monetizing perishable sunk costs for campus cafeteria operators.")
    ]

    for idx, (big_num, lbl, sub) in enumerate(impact_metrics):
        c_left = Inches(0.8 + idx * 2.98)
        add_card(s13, c_left, Inches(1.85), Inches(2.8), Inches(1.75), bg_color=COLOR_DARK_CARD, border_color=COLOR_PRIMARY)

        box = s13.shapes.add_textbox(c_left + Inches(0.18), Inches(1.98), Inches(2.44), Inches(1.5))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        pn = tf.paragraphs[0]
        pn.text = big_num
        pn.font.name = FONT_HEADING
        pn.font.size = Pt(22)
        pn.font.bold = True
        pn.font.color.rgb = COLOR_LIME

        pl = tf.add_paragraph()
        pl.text = lbl
        pl.font.name = FONT_HEADING
        pl.font.size = Pt(10)
        pl.font.bold = True
        pl.font.color.rgb = COLOR_WHITE
        pl.space_after = Pt(3)

        ps = tf.add_paragraph()
        ps.text = sub
        ps.font.name = FONT_BODY
        ps.font.size = Pt(8.5)
        ps.font.color.rgb = RGBColor(200, 215, 205)

    # Middle: UN Sustainable Development Goals Alignment (3 Cards)
    sdgs = [
        ("SDG 12: RESPONSIBLE CONSUMPTION", "Halving per-capita campus food waste at retail and mess hall levels through dynamic cut-off discounting."),
        ("SDG 2: ZERO HUNGER & NUTRITION", "Ensuring safe, nutritious cafeteria meals remain universally accessible to all students regardless of monthly budgets."),
        ("SDG 8: DECENT WORK & MICRO-GIGS", "Fostering flexible, safe, zero-Capex part-time micro-earnings for students within their own university campus.")
    ]

    for idx, (st, sd) in enumerate(sdgs):
        c_left = Inches(0.8 + idx * 3.98)
        add_card(s13, c_left, Inches(3.8), Inches(3.8), Inches(1.35), bg_color=COLOR_DARK_CARD, border_color=COLOR_PRIMARY)

        box = s13.shapes.add_textbox(c_left + Inches(0.18), Inches(3.9), Inches(3.44), Inches(1.15))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        pst = tf.paragraphs[0]
        pst.text = st
        pst.font.name = FONT_HEADING
        pst.font.size = Pt(9.5)
        pst.font.bold = True
        pst.font.color.rgb = COLOR_ORANGE
        pst.space_after = Pt(3)

        psd = tf.add_paragraph()
        psd.text = sd
        psd.font.name = FONT_BODY
        psd.font.size = Pt(8.5)
        psd.font.color.rgb = COLOR_WHITE

    # Bottom: Expansion Vision Banner
    bot_card = add_card(s13, Inches(0.8), Inches(5.35), Inches(11.73), Inches(1.65), bg_color=COLOR_PRIMARY, border_color=COLOR_LIME)
    b_box = s13.shapes.add_textbox(Inches(1.1), Inches(5.45), Inches(11.13), Inches(1.45))
    tf_b = b_box.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = tf_b.margin_top = tf_b.margin_right = tf_b.margin_bottom = 0

    pb_t = tf_b.paragraphs[0]
    pb_t.text = "EXPANSION ROADMAP & VISION: THE NATIONAL CAMPUS CIRCULAR NETWORK"
    pb_t.font.name = FONT_HEADING
    pb_t.font.size = Pt(11)
    pb_t.font.bold = True
    pb_t.font.color.rgb = COLOR_LIME
    pb_t.space_after = Pt(4)

    pb_d1 = tf_b.add_paragraph()
    pb_d1.text = "• Phase 1 (Current): Perfect operational product-market fit across Adani University & Shantigram Township (5-20 vendors, 500 orders/day)."
    pb_d1.font.name = FONT_BODY
    pb_d1.font.size = Pt(9)
    pb_d1.font.color.rgb = COLOR_WHITE

    pb_d2 = tf_b.add_paragraph()
    pb_d2.text = "• Phase 2 (Year 1): Expand across 15 higher-education institutions in the Ahmedabad-Gandhinagar educational corridor (PDEU, NID, IIMA, GNLU)."
    pb_d2.font.name = FONT_BODY
    pb_d2.font.size = Pt(9)
    pb_d2.font.color.rgb = COLOR_WHITE

    pb_d3 = tf_b.add_paragraph()
    pb_d3.text = "• Phase 3 (Year 2-3): Enterprise SaaS & API platform for corporate tech parks (SEZs, Infocity) and university campuses across Tier-1/2 Indian hubs."
    pb_d3.font.name = FONT_BODY
    pb_d3.font.size = Pt(9)
    pb_d3.font.color.rgb = COLOR_WHITE

    # Save presentation
    prs.save(output_pptx_path)
    print(f"Presentation saved successfully to: {output_pptx_path}")

# ==============================================================================
# DELIVERABLE 2: FORMAL EMAIL TO BMC SIR
# ==============================================================================
def create_formal_email_docs(output_docx_path, output_txt_path):
    # Text content of the email
    email_subject = "Course Submission: Business Model Canvas & Venture Deck – Project RescueBite"
    
    email_body = """Respected Sir,

I hope this email finds you well.

I am submitting my final project for the Business Model Canvas (BMC) course, titled RescueBite: Good Food. Better Prices. Less Waste.

RescueBite is a campus-native, closed-loop circular food economy platform developed for the Adani University campus and Shantigram Township, Ahmedabad. The project addresses three interconnected market frictions:
1. Cafeteria Food Loss: Recovering sunk preparation costs on unsold food 60–90 minutes before kitchen closure.
2. Student Dining Affordability: Providing university students with fresh, safe meals at 40%–70% discounts.
3. Flexible On-Campus Micro-Earnings: Enabling students to deliver meals on bicycles or walking between lectures for ₹15 per delivery, supported by a daily 5-delivery meal reward milestone.

As part of this submission, I have attached the complete PowerPoint presentation (RescueBite_BMC_Presentation.pptx) for your review. The presentation covers:
• The operational problem, proposed solution, and target customer segments.
• A comprehensive analysis of all nine building blocks of the Business Model Canvas.
• Front-stage customer relationships and distribution channels alongside back-stage operational feasibility and partnerships.
• Step-by-step operational workflows for self-pickup (4-digit PIN) and student delivery (4-digit OTP).
• Empirical unit economics demonstrating a 54% net contribution margin on representative ₹60 orders.
• A 3-stage expansion model (Campus Pilot to Regional University Cluster) and quantified environmental impact methodology adhering to UNEP and FAO benchmarks.

The complete working full-stack web application, database schema, and detailed academic report have also been documented to validate the commercial and operational viability of the model.

Thank you for your valuable guidance and insights throughout the Business Model Canvas course this semester. I look forward to your evaluation and constructive feedback.

Respectfully yours,

[Your Name]
Enrollment Number: [Your Enrollment Number]
Department / Program: [e.g., Computer Science & Engineering / MBA]
Adani University, Ahmedabad
Email: [Your University Email Address]
Phone: [Your Contact Number]
"""

    # 1. Save TXT file
    with open(output_txt_path, 'w', encoding='utf-8') as f:
        f.write(f"SUBJECT: {email_subject}\n\n")
        f.write(email_body)
    print(f"Email text draft saved successfully to: {output_txt_path}")

    # 2. Save DOCX file
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = DocxInches(1.0)
        s.bottom_margin = DocxInches(1.0)
        s.left_margin = DocxInches(1.0)
        s.right_margin = DocxInches(1.0)

    # Document Title Header
    p_meta = doc.add_paragraph()
    p_meta.paragraph_format.space_before = DocxPt(0)
    p_meta.paragraph_format.space_after = DocxPt(4)
    r_meta = p_meta.add_run("ACADEMIC CORRESPONDENCE / FORMAL SUBMISSION DRAFT")
    r_meta.font.name = 'Calibri'
    r_meta.font.size = DocxPt(9.5)
    r_meta.font.bold = True
    r_meta.font.color.rgb = DocxRGBColor(100, 116, 139)

    # Subject Line Callout Table
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    tbl.columns[0].width = DocxInches(6.5)
    cell = tbl.cell(0, 0)
    
    # Set background for callout
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="F3F7F4"/>')
    tcPr.append(shd)
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="120" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

    p_subj = cell.paragraphs[0]
    p_subj.paragraph_format.space_before = DocxPt(2)
    p_subj.paragraph_format.space_after = DocxPt(2)
    r_sub_label = p_subj.add_run("SUBJECT: ")
    r_sub_label.font.name = 'Calibri'
    r_sub_label.font.size = DocxPt(11)
    r_sub_label.font.bold = True
    r_sub_label.font.color.rgb = DocxRGBColor(23, 77, 56)

    r_sub_text = p_subj.add_run(email_subject)
    r_sub_text.font.name = 'Calibri'
    r_sub_text.font.size = DocxPt(11)
    r_sub_text.font.bold = True
    r_sub_text.font.color.rgb = DocxRGBColor(31, 41, 55)

    doc.add_paragraph().paragraph_format.space_after = DocxPt(12)

    # Email Body Paragraphs
    paragraphs = email_body.split("\n\n")
    for para_text in paragraphs:
        if not para_text.strip():
            continue
        p = doc.add_paragraph()
        p.paragraph_format.space_before = DocxPt(2)
        p.paragraph_format.space_after = DocxPt(6)
        p.paragraph_format.line_spacing = 1.15

        lines = para_text.split("\n")
        for l_idx, line in enumerate(lines):
            r = p.add_run(line)
            r.font.name = 'Calibri'
            r.font.size = DocxPt(10.5)
            r.font.color.rgb = DocxRGBColor(31, 41, 55)
            if line.startswith("Respected Sir,") or line.startswith("• "):
                if line.startswith("• "):
                    r.font.bold = False
                else:
                    r.font.bold = True
            if l_idx < len(lines) - 1:
                p.add_run("\n")

    doc.save(output_docx_path)
    print(f"Email DOCX draft saved successfully to: {output_docx_path}")

# ==============================================================================
# MAIN EXECUTION
# ==============================================================================
if __name__ == "__main__":
    out_dir = os.path.join(os.getcwd(), "BMC_Submission")
    os.makedirs(out_dir, exist_ok=True)

    pptx_path = os.path.join(out_dir, "RescueBite_BMC_Presentation.pptx")
    docx_path = os.path.join(out_dir, "RescueBite_Submission_Email.docx")
    txt_path  = os.path.join(out_dir, "RescueBite_Submission_Email.txt")

    print("Generating Deliverable 1: Professional PowerPoint Presentation (.pptx)...")
    create_presentation(pptx_path)

    print("Generating Deliverable 2: Formal Email Draft (.docx and .txt)...")
    create_formal_email_docs(docx_path, txt_path)

    print("\nAll deliverables generated successfully!")
