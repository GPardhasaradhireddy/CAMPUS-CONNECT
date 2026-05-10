# Dashboard KPI Calculations

Formulas used on the Main Dashboard to calculate and display key performance indicators (KPIs) for the logged-in student. These rely heavily on the SharePoint backend lists.

## 1. Personalized Greeting
Used in a Label's `Text` property to greet the user dynamically.

```powerapps-comma
"Welcome back, " & CurrentUserRecord.'User Name' & "!"
```

## 2. Fetching Current CGPA
Used in the CGPA KPI Card's `Text` property. Fetches data from the `AcdemicDetails` list.

```powerapps-comma
With(
    {
        StudentAcademics: LookUp(AcdemicDetails, 'User Name' = CurrentUserRecord.'User Name')
    },
    If(IsBlank(StudentAcademics), "N/A", Text(StudentAcademics.CGPA, "[$-en-US]0.00"))
)
```

## 3. Calculating Attendance Percentage
Used in the Attendance KPI Card.

```powerapps-comma
With(
    {
        StudentAcademics: LookUp(AcdemicDetails, 'User Name' = CurrentUserRecord.'User Name')
    },
    If(IsBlank(StudentAcademics), "N/A", Text(StudentAcademics.Attendance, "[$-en-US]0") & "%")
)
```

## 4. Total Pending Fees
Used in the Pending Fees KPI Card. Fetches data from the `Fee_details` list.

```powerapps-comma
With(
    {
        StudentFees: Filter(Fee_details, 'User Name' = CurrentUserRecord.'User Name' && Status = "Pending")
    },
    "₹" & Text(Sum(StudentFees, Amount), "[$-en-US]#,##0")
)
```

## 5. Active Backlogs Count
Used in the Active Backlogs KPI Card.

```powerapps-comma
With(
    {
        StudentAcademics: LookUp(AcdemicDetails, 'User Name' = CurrentUserRecord.'User Name')
    },
    If(IsBlank(StudentAcademics), "0", Text(StudentAcademics.Backlogs))
)
```
