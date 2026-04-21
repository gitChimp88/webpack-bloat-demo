import React, { useState } from "react";

// Full lodash import — pulls in all 70+ utilities (~72kB gzipped)
import _ from "lodash";

// Full moment import — pulls in all 160+ locales (~66kB gzipped)
import moment from "moment";
// Importing all locales individually — moment bundles every language
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
import "moment/locale/en-gb";

// Barrel import from @mui/material — prevents tree shaking of MUI
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Badge,
  Tooltip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  LinearProgress,
  Slider,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Pagination,
  Skeleton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
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
  ExpandMore,
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

// Full Chart.js import — registers every chart type and plugin
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
  LogarithmicScale,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  BarController,
} from "chart.js";
import {
  Line,
  Bar,
  Doughnut,
  Radar,
  Scatter,
  Bubble,
  Pie,
  PolarArea,
} from "react-chartjs-2";

// Register everything — even chart types we won't use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  ChartTooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
  LogarithmicScale,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  BarController,
);

// Importing utility files that each have their own redundant logic
import { formatData } from "./utils/formatData";
import { processStats } from "./utils/processStats";
import { generateReport } from "./utils/generateReport";

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

const categoryData = {
  labels: ["Electronics", "Clothing", "Food", "Books", "Toys"],
  datasets: [
    {
      data: [300, 150, 200, 80, 120],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
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

function UserTable({ data }) {
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Joined</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                    {user.name[0]}
                  </Avatar>
                  {user.name}
                </Box>
              </TableCell>
              <TableCell>{user.joined}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={user.score}
                  color={user.score > 50 ? "success" : "warning"}
                />
              </TableCell>
              <TableCell>
                <Switch checked={user.active} size="small" readOnly />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
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
          <StatsCard
            title="Total Users"
            value={users.length}
            icon={<Group />}
          />
          <StatsCard title="Active" value={activeCount} icon={<Check />} />
          <StatsCard title="Avg Score" value={avgScore} icon={<Star />} />
          <StatsCard
            title="Report Lines"
            value={report.length}
            icon={<Info />}
          />
          <StatsCard
            title="Stat Keys"
            value={Object.keys(stats).length}
            icon={<FilterList />}
          />
        </Stack>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Charts" icon={<Sort />} iconPosition="start" />
          <Tab label="Users" icon={<Person />} iconPosition="start" />
          <Tab label="Controls" icon={<Settings />} iconPosition="start" />
        </Tabs>

        {/* Charts tab */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Revenue Over Time
                </Typography>
                <Line data={formattedData || salesData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Category Breakdown
                </Typography>
                <Doughnut data={categoryData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Bar Chart
                </Typography>
                <Bar data={salesData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Radar
                </Typography>
                <Radar
                  data={{
                    labels: [
                      "Speed",
                      "Reliability",
                      "Comfort",
                      "Safety",
                      "Efficiency",
                    ],
                    datasets: [
                      {
                        label: "Score",
                        data: [65, 85, 70, 90, 75],
                        fill: true,
                      },
                    ],
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Users tab */}
        {tab === 1 && (
          <Box>
            <TextField
              label="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
              sx={{ mb: 2 }}
            />
            <UserTable data={filteredUsers} />
            <Box sx={{ mt: 2 }}>
              <Pagination count={10} color="primary" />
            </Box>
          </Box>
        )}

        {/* Controls tab */}
        {tab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography gutterBottom>Threshold: {sliderValue}</Typography>
                <Slider
                  value={sliderValue}
                  onChange={(_, v) => setSliderValue(v)}
                  marks
                  step={10}
                />
                <LinearProgress
                  variant="determinate"
                  value={sliderValue}
                  sx={{ mt: 2 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Advanced Options</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      <FormControl>
                        <InputLabel>Mode</InputLabel>
                        <Select defaultValue="a" label="Mode">
                          <MenuItem value="a">Option A</MenuItem>
                          <MenuItem value="b">Option B</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Priority</FormLabel>
                        <RadioGroup defaultValue="high" row>
                          <Radio value="low" /> Low
                          <Radio value="medium" /> Medium
                          <Radio value="high" /> High
                        </RadioGroup>
                      </FormControl>
                      <Box>
                        <Checkbox defaultChecked /> Enable feature flags
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
