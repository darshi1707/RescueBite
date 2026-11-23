# RESCUEBITE
### *Good Food. Better Prices. Less Waste.*
**A Campus Circular Economy Platform for Adani University & Shantigram Township, Ahmedabad**

---

## 🌟 Executive Overview
**RescueBite** is a campus-native three-sided web application engineered to solve food wastage across university cafeterias and residential township eateries while creating affordable dining for students and dignified micro-earning opportunities for student couriers.

Rather than functioning simply as a surplus-food discount board, RescueBite interconnects:
1. **Student Food Buyers**: University students gaining access to nutritious, wholesome meals at 40%–70% discounts.
2. **Cafeterias & Food Vendors**: Canteens and restaurants monetizing unsold inventory 60–90 minutes before kitchen cut-off.
3. **Student Delivery Partners**: Students earning ₹15/delivery on bicycles or walking between lectures, plus earning **Free Meal Reward Credits** through an innovative **5-delivery daily milestone**.
4. **Campus Administrator Office**: Institutional supervisory dashboard managing `@adaniuni.ac.in` domain verifications, vendor approvals, platform commission rates, and environmental impact reporting.

---

## 🚀 Key Features by User Persona

### 1. 🎓 Student Food Buyer
- **Institutional Verification**: Enforces university email verification (`@adaniuni.ac.in`), student enrollment IDs, department, and year of study. Full IDs are kept private.
- **Dynamic Marketplace**: Real-time surplus inventory with search, category filters (*Snacks, Wraps, Meals, Bowls, Breakfast, Bakery*), price sliders, and pickup deadlines.
- **Fulfillment Flexibility**: Choose between free **Self-Pickup** at the cafeteria counter or **Student Delivery** directly to campus hostels/libraries.
- **Pickup PIN & Delivery OTP**: Dual-security verification with unique 4-digit codes to prevent theft and misplacement.
- **Personal Impact Dashboard**: Real-time counter of total meals rescued, financial savings (₹), and personal carbon footprint avoided (kg CO2e).

### 2. 🚴 Student Delivery Partner ("Earn with RescueBite")
- **Voluntary & Unified Profile**: Verified students can activate courier capabilities without creating separate accounts.
- **Zero-Capex Delivery Modes**: Walking, Bicycle, or Two-wheeler within the 500m–1.2km campus boundary.
- **Live Broadcast Board**: Available requests show pickup canteen, delivery hostel, estimated delivery payout (₹15), and distance.
- **Concurrency Locks**: Atomic database updates ensure only one courier can accept a delivery request.
- **Daily 5-Delivery Meal Reward System**:
  - Deliveries 1 to 4: Standard ₹15 cash delivery payout.
  - Delivery 5: ₹15 cash delivery payout **PLUS a ₹60 Free Meal Reward Credit**.
  - Total compensation for 5 deliveries = **₹135 total value** (₹75 cash + ₹60 dining voucher).
- **Courier Wallet**: Dual ledger separating withdrawable cash earnings from cafeteria meal credits, with real-time 1-click meal voucher redemption.

### 3. 🍲 Cafeteria / Food Operator
- **Fast Surplus Food Publishing**: Post surplus dishes with preparation timestamps, original price, discounted price (auto-calculated % discount), quantity remaining, and allergen tags.
- **Cut-Off Scheduling**: Automatic stock decrementing and deadline enforcement.
- **Counter PIN Verification**: Enter the student's 4-digit Pickup PIN to verify handover.
- **Recovered Revenue Ledger**: Direct accounting of recovered revenue (net of 10% platform commission).

### 4. ⚙️ Campus Administrator
- **Student Verification Queue**: Review and 1-click approve or reject student academic credentials.
- **Dynamic Policy Sliders**: Adjust platform commission (8%–15%), courier fees (₹15), coordination fees (₹4), and daily meal reward targets.
- **Domain Configuration**: Configure authorized academic domains (`adaniuni.ac.in,shantigram.res`).
- **Institutional ESG Analytics**: UNEP/FAO compliant sustainability metrics.

---

## 🔬 Scientifically Defensible Environmental Impact Methodology
RescueBite tracks greenhouse gas mitigation using the **United Nations Environment Programme (UNEP) Food Waste Index** and **FAO lifecycle assessment standards**:
- **Emission Factor**: **2.5 kg CO2e** per 1.0 kg of prepared food discarded (accounting for agricultural cultivation, cold-chain transport, preparation energy, and landfill methane decomposition).
- **Standard Portion Weight**: **0.40 kg (400g)** average meal portion.
- **Formula**: $\text{CO2e Avoided (kg)} = \text{Meals Rescued} \times 0.40 \times 2.5 = 1.0 \text{ kg CO2e per meal}$.
- **Water Footprint**: Conserves approximately **380 liters** of embedded freshwater per kg of food saved.

---

## 📊 Business Model & Financial Unit Economics

### Representative Single Delivery Order Breakdown:
| Component | Amount (INR) | Operational Explanation |
| :--- | :--- | :--- |
| **Discounted Meal Price** | ₹60.00 | 50% discount on standard ₹120 retail price |
| **Delivery Charge (Buyer Pays)** | ₹19.00 | Includes courier fee + platform coordination fee |
| **Total Invoiced to Student Buyer** | ₹79.00 | Collected via simulated UPI / cash |
| **Vendor Net Payout (10% Comm.)** | ₹54.00 | Direct incremental cost recovery for cafeteria |
| **Student Courier Payout** | ₹15.00 | 100% pass-through into courier wallet |
| **RescueBite Gross Revenue** | ₹10.00 | ₹6.00 vendor commission + ₹4.00 coordination fee |
| **Gateway & Infra Reserve (~2%)** | ₹1.60 | Cloud hosting and payment processing |
| **Meal Reward Provision Reserve** | ₹3.00 | Allocated toward courier 5-delivery reward pool |
| **Net Platform Contribution Margin** | **₹5.40** | **Positive 54% gross contribution per order** |

---

## 📁 Generated Word Documentation (.docx)
The following academic- and investor-grade Microsoft Word documents are generated directly in the workspace root:

1. **`RESCUEBITE_PROJECT_REPORT.docx`**: Full 18-chapter master project report covering project title, introduction, problem statement, objectives, proposed solution, operations, user roles, student verification, marketplace, student couriers, meal reward system, BMC, revenue model, financial assumptions, environmental impact, roadmap, future scope, and conclusion.
2. **`RESCUEBITE_BUSINESS_MODEL_CANVAS.docx`**: Complete structured 9-building block canvas with benefit analyses for all 3 ecosystem customer segments.
3. **`RESCUEBITE_INVESTOR_PITCH.docx`**: Professional investor presentation document with unit economics, competitive advantages, 3-stage financial projections (Stage 1: 5 vendors, Stage 2: 20 vendors, Stage 3: 50 vendors), and seed round capital allocation.
4. **`RESCUEBITE_DEMO_GUIDE.docx`**: Step-by-step evaluator presentation guide with pre-configured demo account credentials and click-by-click walkthroughs for professors.

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Recharts
- **Backend**: Node.js v22, Express.js REST API
- **Database**: SQLite (Node v22 native `node:sqlite` DatabaseSync)
- **Document Engine**: Python `python-docx`

---

## 🚀 Installation & Execution Instructions

### Prerequisites:
- Node.js v18+ (tested on Node v22.19.0)
- Python 3.10+ (with `python-docx` for document generation)

### 1. Start the Express + SQLite Backend:
```powershell
npm run server
```
*The API server will listen on `http://localhost:5001`.*

### 2. Start the Vite Frontend Development Server:
```powershell
npm run client
```
*The web interface will open at `http://localhost:5173`.*

---

## 🔑 Pre-Configured Demo Accounts (1-Click Switcher Available)

| Role | Email | Password | Key Testing Highlights |
| :--- | :--- | :--- | :--- |
| **🎓 Student Buyer** | `student@adaniuni.ac.in` | `student123` | Verified student badge, surplus marketplace browsing, self-pickup and delivery checkout, order PINs |
| **🚴 Student Courier** | `delivery@adaniuni.ac.in` | `delivery123` | **4/5 deliveries completed today**! Accept 1 delivery and enter OTP to trigger the **5th Free Meal Reward**! |
| **🍲 Cafeteria Vendor** | `canteen@adaniuni.ac.in` | `vendor123` | Add surplus food form, manage live listings, verify 4-digit student pickup PINs |
| **⚙️ Platform Admin** | `admin@rescuebite.com` | `admin123` | Approve student verifications, adjust commission %, set delivery fees and meal reward targets |

---

## 🎓 Professor Demonstration Walkthrough (5-Minute Script)
1. **Open `http://localhost:5173`**: Show the hero landing page with live Adani University impact counters.
2. **Click "1-Click Evaluator Personas" -> Student (Aarav)**:
   - Browse the surplus marketplace (e.g. Veg Club Sandwich at 50% discount).
   - Click "Reserve" -> Select "Student Delivery" -> Confirm order.
   - Show the generated 4-digit Delivery OTP on the Student Dashboard.
3. **Switch Persona to Delivery Partner (Rohan Sharma)**:
   - Open "Delivery Hub" -> Available Delivery Requests -> Click "Accept Delivery".
   - Mark "Confirm Food Collected" at the cafeteria.
   - Enter the student's 4-digit OTP -> Click "Verify OTP & Complete Delivery".
   - **Observe the Milestone Trigger**: The progress bar reaches **5/5 Deliveries**, crediting **₹15 cash + ₹60 FREE MEAL REWARD** into the wallet!
4. **Switch Persona to Cafeteria Vendor**:
   - Open "Add Surplus Food" -> Post a new item -> Watch it appear live on the Marketplace.
5. **Switch Persona to Platform Admin**:
   - Review pending student verifications and adjust commission/delivery fee sliders.
   - Walk through the **Environmental Impact Dashboard**, **Business Model Canvas**, and **Investor Pitch**.

---
*Developed for Adani University & Shantigram Township, Ahmedabad. Licensed under Academic & Commercial Startup Evaluation.*
