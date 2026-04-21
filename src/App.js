import React, { useState, Suspense } from "react";

import { times, startCase, uniqueId, random, sample, filter, includes, meanBy, size } from "lodash-es";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import Check from "@mui/icons-material/Check";
import Menu from "@mui/icons-material/Menu";
import Star from "@mui/icons-material/Star";
import FilterList from "@mui/icons-material/FilterList";
import Sort from "@mui/icons-material/Sort";
import Notifications from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import Group from "@mui/icons-material/Group";
import Lock from "@mui/icons-material/Lock";
import Info from "@mui/icons-material/Info";

// Importing utility files that each have their own redundant logic
import { formatData } from "./utils/formatData";
import { processStats } from "./utils/processStats";
import { generateReport } from "./utils/generateReport";

// Tab panels — lazily loaded, each becomes its own chunk
const ChartsTab = React.lazy(() => import("./tabs/ChartsTab"));
const UsersTab = React.lazy(() => import("./tabs/UsersTab"));
const ControlsTab = React.lazy(() => import("./tabs/ControlsTab"));

// ---- Fake data ----------------------------------------------------------------

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 3000, 5000, 22000, 30000],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const users = times(20, (i) => ({
  id: i + 1,
  name: startCase(uniqueId("user_")),
  joined: dayjs().subtract(random(1, 365), "days").format("MMMM Do YYYY"),
  score: random(1, 100),
  active: sample([true, false]),
}));

// ---- Subcomponents ------------------------------------------------------------

function StatsCard({ title, value, icon }) {
  return (
    <Card sx={{ minWidth: 180, flex: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="h4" color="primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ---- Main App -----------------------------------------------------------------

export default function App() {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderValue, setSliderValue] = useState(30);

  const filteredUsers = filter(users, (u) =>
    includes(u.name.toLowerCase(), searchQuery.toLowerCase()),
  );

  const avgScore = meanBy(users, "score").toFixed(1);
  const activeCount = filter(users, "active").length;

  const report = generateReport(users);
  const formattedData = formatData(salesData);
  const stats = processStats(users);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar using icons that may never be visible */}
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Open menu">
            <Button color="inherit" onClick={() => setDrawerOpen(true)}>
              <Menu />
            </Button>
          </Tooltip>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sales Dashboard — {dayjs().format("LLLL")}
          </Typography>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </Toolbar>
      </AppBar>

      {/* Sidebar drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {[
              { label: "Home", icon: <Home /> },
              { label: "Settings", icon: <Settings /> },
              { label: "Profile", icon: <Person /> },
              { label: "Group", icon: <Group /> },
              { label: "Lock", icon: <Lock /> },
            ].map(({ label, icon }) => (
              <ListItem key={label} button>
                {icon}
                <ListItemText primary={label} sx={{ ml: 1 }} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Stats row */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <StatsCard title="Total Users" value={users.length} icon={<Group />} />
          <StatsCard title="Active" value={activeCount} icon={<Check />} />
          <StatsCard title="Avg Score" value={avgScore} icon={<Star />} />
          <StatsCard title="Report Lines" value={report.length} icon={<Info />} />
          <StatsCard title="Stat Keys" value={Object.keys(stats).length} icon={<FilterList />} />
        </Stack>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Charts" icon={<Sort />} iconPosition="start" />
          <Tab label="Users" icon={<Person />} iconPosition="start" />
          <Tab label="Controls" icon={<Settings />} iconPosition="start" />
        </Tabs>

        <Suspense fallback={<div>Loading...</div>}>
          {tab === 0 && <ChartsTab formattedData={formattedData} />}
          {tab === 1 && (
            <UsersTab
              filteredUsers={filteredUsers}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
          {tab === 2 && (
            <ControlsTab sliderValue={sliderValue} setSliderValue={setSliderValue} />
          )}
        </Suspense>

        <Alert severity="info" sx={{ mt: 3 }}>
          Built {dayjs().fromNow()} · {size(users)} users loaded
        </Alert>
      </Container>
    </Box>
  );
}
