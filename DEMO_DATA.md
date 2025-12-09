# Demo Data Documentation

## Overview

The demo mode includes comprehensive sample data for all major entities in the system, allowing users to fully explore the application without needing a real database connection.

---

## 📋 Demo Patients (5 Total)

### Patient 1: John Michael Smith

- **Account #**: PT001
- **Contact**: 555-0123, john.smith@email.com
- **DOB**: March 15, 1985
- **Height/Weight**: 6'2", 185 lbs
- **Address**: 123 Main St, Springfield
- **Next Appointment**: December 15, 2024

### Patient 2: Maria Elena Garcia

- **Account #**: PT002
- **Contact**: 555-0456, maria.garcia@email.com
- **DOB**: July 22, 1990
- **Height/Weight**: 5'6", 140 lbs
- **Address**: 456 Oak Ave, Springfield
- **Next Appointment**: December 12, 2024

### Patient 3: David Robert Johnson

- **Account #**: PT003
- **Contact**: 555-0789, david.j@email.com
- **DOB**: November 30, 1978
- **Height/Weight**: 5'10", 175 lbs
- **Address**: 789 Pine Rd, Springfield
- **Next Appointment**: December 18, 2024

### Patient 4: Lisa Ann Williams

- **Account #**: PT004
- **Contact**: 555-0321, lisa.w@email.com
- **DOB**: February 18, 1995
- **Height/Weight**: 5'4", 125 lbs
- **Address**: 321 Elm St, Springfield
- **Next Appointment**: December 10, 2024

### Patient 5: Robert James Brown

- **Account #**: PT005
- **Contact**: 555-0654, robert.brown@email.com
- **DOB**: September 5, 1982
- **Height/Weight**: 6'0", 190 lbs
- **Address**: 654 Maple Dr, Springfield
- **Next Appointment**: December 20, 2024

---

## 🩺 Patient Complaints (8 Total)

### John Smith (PT001)

1. Lower back pain radiating down right leg - **Pain Level: 7/10**
2. Neck stiffness and reduced mobility - **Pain Level: 5/10**

### Maria Garcia (PT002)

3. Chronic headaches, especially in morning - **Pain Level: 6/10**
4. Shoulder tension and limited range of motion - **Pain Level: 4/10**

### David Johnson (PT003)

5. Mid-back pain after prolonged sitting - **Pain Level: 5/10**

### Lisa Williams (PT004)

6. Right hip pain when walking - **Pain Level: 6/10**
7. Tingling sensation in left arm - **Pain Level: 3/10**

### Robert Brown (PT005)

8. Upper back tightness and spasms - **Pain Level: 7/10**

---

## 📝 Treatment Notes (5 Total)

Each patient has at least one comprehensive treatment note with:

- **Vitals**: Temperature, pulse, blood pressure, respiration
- **Treatment Duration**: Physiotherapy, treatment, and exercise times
- **Room Assignments**: Phase 1-4 room tracking
- **Doctor's Notes**: Detailed treatment observations
- **Additional Notes**: Progress tracking and recommendations

### Example Note Structure (All patients have similar detail):

- Visit date and timestamp
- Complete vital signs (98.4-98.8°F, HR: 68-78, BP: 115-130/75-85)
- Treatment details (15-22 min physiotherapy)
- Multi-phase room assignments
- Comprehensive doctor observations
- Patient response and follow-up plans

---

## 📊 Exam Reports (3 Total)

### Patient 1: John Smith - November 20, 2024

- **Vitals**: 98.6°F, 120/80, HR: 72, RR: 16
- **Observations**: Antalgic gait favoring right side
- **Speech**: Clear and coherent
- **Rhomberg Test**: Negative
- **Demeanor**: Alert and cooperative

### Patient 2: Maria Garcia - November 25, 2024

- **Vitals**: 98.4°F, 115/75, HR: 68, RR: 14
- **Observations**: Normal, steady gait
- **Speech**: Clear
- **Rhomberg Test**: Negative
- **Demeanor**: Pleasant, engaged

### Patient 3: David Johnson - November 28, 2024

- **Vitals**: 98.7°F, 125/82, HR: 75, RR: 15
- **Observations**: Slightly guarded gait
- **Speech**: Normal
- **Rhomberg Test**: Negative
- **Demeanor**: Cooperative

---

## ⚙️ Settings - Rooms (9 Total)

Pre-configured room options for patient flow:

1. Room 1
2. Room 2
3. Room 3
4. Room 4
5. Treatment A
6. Treatment B
7. Treatment C
8. Recovery
9. Final

---

## 🔧 Settings - Treatment Options (15 Total)

### Physio Positioning (5 options)

1. Supine Position
2. Prone Position
3. Side-Lying (Left)
4. Side-Lying (Right)
5. Seated

### Treatment Positioning (4 options)

6. Flexion-Distraction
7. Drop Table
8. Manual Adjustment
9. Activator

### Treatment Techniques (6 options)

10. Diversified Technique
11. Gonstead Technique
12. Thompson Technique
13. Cox Flexion-Distraction
14. Activator Method
15. Soft Tissue Mobilization

---

## 💆 Treatment Method Names (8 Total)

Standard treatment modalities:

1. Cold Pack
2. Hot Pack
3. Electrical Stimulation
4. Ultrasound
5. Traction
6. Massage Therapy
7. Stretching
8. Exercise Therapy

---

## 📋 Treatment Plan Options (8 Total)

Common treatment plan recommendations:

1. Continue current treatment protocol
2. Increase frequency to 3x per week
3. Reduce frequency to 1x per week
4. Add home exercise program
5. Schedule re-examination in 4 weeks
6. Maintain maintenance care schedule
7. Refer for additional imaging
8. Co-management with physical therapy

---

## 🔄 Data Relationships

All demo data is properly interconnected:

- **Patients → Complaints**: Each patient has 1-2 documented complaints
- **Patients → Notes**: Each patient has at least 1 treatment note
- **Patients → Reports**: First 3 patients have comprehensive exam reports
- **Notes → Room Assignments**: All notes include phase-based room tracking
- **Settings → All Pages**: Room and treatment options are used throughout

---

## ✨ Key Features

### Fully Interactive

- ✅ All CRUD operations work in demo mode
- ✅ Add new patients, complaints, notes
- ✅ Edit existing data
- ✅ Delete records (filtered properly)
- ✅ Search and filter functionality

### Realistic Content

- ✅ Clinical terminology and proper medical notation
- ✅ Realistic pain levels and symptoms
- ✅ Proper vital sign ranges
- ✅ Professional documentation style
- ✅ Connected patient histories

### Settings Pre-configured

- ✅ 9 room options ready to use
- ✅ 15 treatment options across 3 categories
- ✅ 8 treatment methods for documentation
- ✅ 8 treatment plan templates

---

## 🎯 Usage in Demo Mode

When a user signs in with a demo account:

1. All data loads automatically from the demo store
2. No API calls are made
3. Changes persist during the session
4. Data resets on logout
5. Guided tour highlights all features

---

## 📁 File Locations

**Data Definition**: `composables/useDemoData.ts`
**State Management**: `store/demo.ts`
**Integration**: Pages check `demoStore.getIsDemo` flag

---

**Last Updated**: December 8, 2024
**Demo Data Version**: 1.0
