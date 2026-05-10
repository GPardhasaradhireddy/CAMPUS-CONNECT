# Navigation and Routing Logic

Formulas managing the global navigation sidebar, deep linking, and dynamic menu generation based on user roles within Campus Connect.

## 1. Dynamic Sidebar Items (Items Property)
Used in the `Items` property of the main Sidebar Gallery to show or hide navigation items dynamically based on the current user's role.

```powerapps-comma
Filter(
    Table(
        { Title: "Dashboard", TargetScreen: MainDashboard, Icon: Icon.Home, VisibleTo: "All" },
        { Title: "My Profile", TargetScreen: ProfileScreen, Icon: Icon.User, VisibleTo: "All" },
        { Title: "Leave Application", TargetScreen: LeaveScreen, Icon: Icon.Calendar, VisibleTo: "All" },
        { Title: "Complaints", TargetScreen: ComplaintScreen, Icon: Icon.Warning, VisibleTo: "All" },
        { Title: "Placements", TargetScreen: PlacementScreen, Icon: Icon.Briefcase, VisibleTo: "All" },
        { Title: "Admin Panel", TargetScreen: AdminScreen, Icon: Icon.Settings, VisibleTo: "Admin" },
        { Title: "Review Portal", TargetScreen: ReviewerScreen, Icon: Icon.CheckBadge, VisibleTo: "Reviewer" }
    ),
    VisibleTo = "All" Or VisibleTo = UserRole
)
```

## 2. Sidebar Component Navigation (OnSelect Property)
Used in the `OnSelect` property of the template item within the Sidebar Gallery component.

```powerapps-comma
// Navigation logic based on the selected item in the sidebar gallery
Navigate(ThisItem.TargetScreen, ScreenTransition.Fade)
```

## 3. Highlighting the Active Menu Item
Used in the `Color` or `Fill` property of the sidebar item to visually indicate which screen the user is currently on.

```powerapps-comma
If(
    App.ActiveScreen = ThisItem.TargetScreen,
    RGBA(0, 120, 212, 1), // Active Theme Color
    RGBA(100, 100, 100, 1) // Inactive Gray
)
```
