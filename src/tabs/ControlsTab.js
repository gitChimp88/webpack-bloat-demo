import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Slider,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Box,
  Checkbox,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

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
