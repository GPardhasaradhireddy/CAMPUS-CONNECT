# Authentication & Role Logic

This file contains Power Fx formulas for authenticating users and managing their roles across the Campus Connect application.

## 1. User Login Validation
Used on the Login Screen's `OnSelect` property for the "Sign In" button. Validates credentials against the `UserCredential` SharePoint list.

```powerapps-comma
// Authenticate User
Set(
    CurrentUserRecord,
    LookUp(
        UserCredential,
        'User Name' = txtUsername.Text && Password = txtPassword.Text
    )
);

If(
    !IsBlank(CurrentUserRecord),
    // Login Successful
    Set(IsLoggedIn, true);
    Set(UserRole, CurrentUserRecord.Role);
    Navigate(MainDashboard, ScreenTransition.Fade),
    // Login Failed
    Notify("Invalid Roll Number or Password. Please try again.", NotificationType.Error)
)
```

## 2. Check Role-Based Access
Used in the `Visible` property of Admin-only controls or screens to enforce Role-Based Access Control (RBAC).

```powerapps-comma
// Returns true if the user is an Admin
UserRole = "Admin"
```

## 3. Logout Logic
Used on the "Log Out" button `OnSelect` property to clear the session and return to the login screen.

```powerapps-comma
// Clear current session variables
Set(CurrentUserRecord, Blank());
Set(IsLoggedIn, false);
Set(UserRole, Blank());
Clear(LocalCache);

// Navigate to Login Screen
Navigate(LoginScreen, ScreenTransition.Fade)
```
