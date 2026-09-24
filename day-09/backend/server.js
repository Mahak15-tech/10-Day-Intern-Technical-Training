const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const path = require("path");
let submittedInspections = [];
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(
  __dirname,
  "data",
  "facility_hygiene_ml_dataset.xlsx"
);

function loadData() {
  const workbook = XLSX.readFile(DATA_FILE);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  return XLSX.utils.sheet_to_json(sheet);
}

app.get("/", (req, res) => {
  res.json({
    message: "Day 9 Facility Management API is running"
  });
});

app.get("/api/facilities", (req, res) => {
  try {
    const data = loadData();

    const facilities = data.map((item, index) => ({
      id: index + 1,
      facility_id: item.facility_id,
      location: item.location,
      facility_type: item.facility_type,
      status: "Active",
      lastInspection: item.inspection_date
    }));

    res.json(facilities);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load facility dataset",
      error: error.message
    });
  }
});

app.get("/api/facilities/:id", (req, res) => {
  try {
    const data = loadData();

    const facility = data.find(
      item => item.facility_id === req.params.id
    );

    if (!facility) {
      return res.status(404).json({
        message: "Facility not found"
      });
    }

    res.json(facility);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load facility",
      error: error.message
    });
  }
});

app.get("/api/inspections", (req, res) => {
  try {
    const data = loadData();

    const facilityId = req.query.facility_id;

    let inspections = facilityId
      ? data.filter(item => item.facility_id === facilityId)
      : data;

    inspections = [...inspections, ...submittedInspections];

    if (facilityId) {
      inspections = inspections.filter(
        item => item.facility_id === facilityId
      );
    }

    res.json(inspections);

  } catch (error) {
    res.status(500).json({
      message: "Unable to load inspections",
      error: error.message
    });
  }
});

app.listen(5002, "127.0.0.1", () => {
  console.log("Day 9 API running at http://127.0.0.1:5002");
});