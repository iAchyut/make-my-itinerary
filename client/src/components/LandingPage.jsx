import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import PlaceAutoComplete from "./AutoComplete/index";
import { GetPlaceAutofill } from "../apiCalls/api";
import DatePickerComponent from "./DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function LandingPage() {
  const [place, setPlace] = React.useState("");
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const SubmitForm = () => {
    
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MakeMyItinerary.com
          </Typography>
          <Button color="inherit">Places</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Plan Your Perfect Trip
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          Enter your dream destination and travel dates. Let us generate your
          itinerary!
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PlaceAutoComplete
                value={place}
                setValue={setPlace}
                handleAutocomplete={GetPlaceAutofill}
                label="Where do you want to go?"
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={6}>
                <DatePickerComponent date={fromDate} setDate={setFromDate} />
              </Grid>
              <Grid item xs={6}>
                <DatePickerComponent date={toDate} setDate={setToDate} />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12}>
              <Button onClick={SubmitForm} variant="contained" size="large" fullWidth>
                Generate Itinerary
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Box
        component="footer"
        sx={{ bgcolor: "grey.900", color: "white", py: 6 }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body2">
                MakeMyItinerary.com helps you plan the perfect journey with
                AI-powered travel recommendations.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">
                Email: support@makemyitinerary.com
              </Typography>
              <Typography variant="body2">Phone: +91-9876543210</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Terms of Use
              </Link>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography variant="body2">
              © {new Date().getFullYear()} MakeMyItinerary.com. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default LandingPage;
