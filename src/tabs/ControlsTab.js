import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ControlsTab({ sliderValue, setSliderValue }) {
  return (
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
          <LinearProgress variant="determinate" value={sliderValue} sx={{ mt: 2 }} />
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
  );
}
