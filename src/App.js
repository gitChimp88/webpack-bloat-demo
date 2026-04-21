import React, { useState, Suspense } from "react";

// Full lodash import — pulls in all 70+ utilities (~72kB gzipped)
import _ from "lodash";

// Full moment import — pulls in all 160+ locales (~66kB gzipped)
import moment from "moment";
// Importing all locales individually — moment bundles every language
import "moment/locale/en-gb";
import "moment/locale/fr";
import "moment/locale/de";
import "moment/locale/es";
import "moment/locale/it";
import "moment/locale/pt";
import "moment/locale/nl";
import "moment/locale/ru";
import "moment/locale/ja";
import "moment/locale/zh-cn";
import "moment/locale/ar";
import "moment/locale/ko";
import "moment/locale/sv";
import "moment/locale/pl";
import "moment/locale/tr";

// Barrel import from @mui/material — prevents tree shaking of MUI
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
  Stack,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";

// Barrel import from @mui/icons-material — tree shaking cannot work on barrel exports
import {
  Home,
  Settings,
  Search,
  Add,
  Delete,
  Edit,
  Save,
  Cancel,
  Check,
  Close,
  Menu,
  ArrowBack,
  ArrowForward,
  ChevronLeft,
  ChevronRight,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
  Download,
  Upload,
  Share,
  Print,
  Refresh,
  FilterList,
  Sort,
  MoreVert,
  Notifications,
  NotificationsOff,
  Person,
  Group,
  Lock,
  LockOpen,
  Info,
  Warning,
  Error as ErrorIcon,
} from "@mui/icons-material";

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

const users = _.times(20, (i) => ({
  id: i + 1,
  name: _.startCase(_.uniqueId("user_")),
  joined: moment().subtract(_.random(1, 365), "days").format("MMMM Do YYYY"),
  score: _.random(1, 100),
  active: _.sample([true, false]),
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

  const filteredUsers = _.filter(users, (u) =>
    _.includes(u.name.toLowerCase(), searchQuery.toLowerCase()),
  );

  const avgScore = _.meanBy(users, "score").toFixed(1);
  const activeCount = _.filter(users, "active").length;

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
            Sales Dashboard — {moment().format("LLLL")}
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
          Built {moment().fromNow()} · Lodash version {_.VERSION} ·{" "}
          {_.size(users)} users loaded
        </Alert>
      </Container>
    </Box>
  );
}
