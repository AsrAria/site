// MARK: project ui imports
import HomePage from "views/Home/HomePage.jsx";
import ChangePassword from "views/User/ChangePassword.jsx";
import IncreaseBalance from "views/User/IncreaseBalance.jsx";
import PersonProfilePage from "views/Person/PersonProfilePage.jsx";
import PersonHealthTestPage from "views/Person/HealthTest/PersonHealthTestPage.jsx";
import PersonMeetingsPage from "views/Person/Meeting/PersonMeetingsPage.jsx";
import PersonHealthRecordsPage from "views/Person/HealthRecord/PersonHealthRecordsPage.jsx";
import PersonPackagesPage from "views/Person/Package/PersonPackagesPage.jsx";
import PsychiatristProfilePage from "views/Psychiatrist/PsychiatristProfilePage.jsx";
import PsychiatristMeetingsPage from "views/Psychiatrist/Meeting/PsychiatristMeetingsPage.jsx";
import PsychiatristTimeBoxesPage from "views/Psychiatrist/TimeBox/PsychiatristTimeBoxesPage.jsx";
import OrganizationProfilePage from "views/Organization/OrganizationProfilePage.jsx";
import OrganizationPersonsPage from "views/Organization/Person/OrganizationPersonsPage.jsx";
import OrganizationPackagesPage from "views/Organization/Package/OrganizationPackagesPage.jsx";
import PaymentsPage from "views/Payment/PaymentsPage.jsx";

export const dashboardTable = user => {
  var profilePage = null;
  if (user.profile.role === 0) {
    profilePage = PersonProfilePage;
  } else if (user.profile.role === 1) {
    profilePage = PsychiatristProfilePage;
  } else if (user.profile.role === 2) {
    profilePage = OrganizationProfilePage;
  }

  var table = [
    [
      {
        visible: true,
        path: "/dashboard",
        name: "Home",
        icon: "home",
        component: user.profile.is_profile_updated ? HomePage : profilePage
      }
    ]
  ];

  table.push([
    {
      visible: true,
      path: "/updateProfile",
      name: "Profile",
      icon: "person",
      component: profilePage
    }
  ]);

  table.push([
    {
      visible: true,
      path: "/changePassword",
      name: "Change password",
      icon: "person",
      component: ChangePassword
    }
  ]);

  table.push([
    {
      visible: true,
      path: "/increaseBalance",
      name: "Increase balance",
      icon: "payment",
      component: IncreaseBalance
    }
  ]);

  if (user.profile.role === 0) {
    if (user.profile.is_profile_updated) {
      table.push([
        {
          visible: true,
          path: "/health_test",
          name: "Health Assessment",
          icon: "rule",
          component: PersonHealthTestPage
        }
      ]);
      table.push([
        {
          visible: true,
          path: "/health_records",
          name: "Health Records",
          icon: "loyalty",
          component: PersonHealthRecordsPage
        }
      ]);
      table.push([
        {
          visible: true,
          path: "/meetings",
          name:
            "Meetings " +
            (user.profile.notification_count > 0
              ? " (" + user.profile.notification_count + ")"
              : ""),
          icon: "group_work",
          component: PersonMeetingsPage
        }
      ]);
      table.push([
        {
          visible: true,
          path: "/packages",
          name: "Packages",
          icon: "shopping_cart",
          component: PersonPackagesPage
        }
      ]);
      table.push([
        {
          visible: true,
          path: "/payments",
          name: "Payments",
          icon: "payment",
          component: PaymentsPage
        }
      ]);
    }
  } else {
    if (user.profile.is_confirmed) {
      if (user.profile.role === 1) {
        table.push([
          {
            visible: true,
            path: "/meetings",
            name:
              "Meetings " +
              (user.profile.notification_count > 0
                ? " (" + user.profile.notification_count + ")"
                : ""),
            icon: "group_work",
            component: PsychiatristMeetingsPage
          }
        ]);
        table.push([
          {
            visible: true,
            path: "/time_boxes",
            name: "Time schedule",
            icon: "event_note",
            component: PsychiatristTimeBoxesPage
          }
        ]);
      }
      if (user.profile.role === 2) {
        table.push([
          {
            visible: true,
            path: "/packages",
            name: "Packages",
            icon: "shopping_cart",
            component: OrganizationPackagesPage
          }
        ]);
        table.push([
          {
            visible: true,
            path: "/persons",
            name: "Persons",
            icon: "person",
            component: OrganizationPersonsPage
          }
        ]);
      }
    }
  }

  table.push([
    {
      visible: false,
      redirect: true,
      path: "/",
      to: "/dashboard"
    }
  ]);
  return table;
};

export const dashboardRoutes = user => {
  var dashboardRoutes = [];
  var table = dashboardTable(user);
  for (var i of table) {
    for (var j of i) {
      if (Object.keys(j).length > 2) dashboardRoutes.push(j);
    }
  }
  return dashboardRoutes;
};
