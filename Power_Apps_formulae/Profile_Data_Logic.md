# Profile Data Logic

Formulas used on the "My Profile" page to fetch and bind comprehensive student demographic and academic data from SharePoint lists.

## 1. OnVisible Initialization
Used on the Profile Screen's `OnVisible` property to load all necessary data efficiently concurrently, reducing loading time.

```powerapps-comma
Concurrent(
    Set(
        StudentProfile,
        LookUp(Personal_Details, 'User Name' = CurrentUserRecord.'User Name')
    ),
    Set(
        StudentAcademics,
        LookUp(AcdemicDetails, 'User Name' = CurrentUserRecord.'User Name')
    )
)
```

## 2. Profile Field Bindings
These formulas are used in the `Text` or `Default` properties of specific controls on the profile screen.

**Full Name:**
```powerapps-comma
StudentProfile.Name
```

**Course/Programme Details:**
```powerapps-comma
StudentProfile.Programme & " - " & StudentProfile.Department & " (Year " & StudentProfile.Year & ")"
```

**Contact Info Summary:**
```powerapps-comma
"Email: " & StudentProfile.Email & Char(10) & "Phone: " & StudentProfile.'Phone Number'
```

**Guardian Info:**
```powerapps-comma
StudentProfile.'Guardian Name' & " (" & StudentProfile.'Guardian Number' & ")"
```

**Entrance Type:**
```powerapps-comma
StudentProfile.'Entrance Type'
```

**Overall SGPA (Last Semester):**
```powerapps-comma
Text(StudentAcademics.SGPA, "[$-en-US]0.00")
```
