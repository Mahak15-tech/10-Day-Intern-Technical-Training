const API_URL = "/api";
let facilityDataset = [];

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    setupTheme();
    setupNavigation();
    checkAPIStatus();
    loadDataset();
    loadDashboard();
    setupAssessment();
    showPredictionHistory();
    showFacilities();
    loadAnalytics();
    setupSettings();

});


// =====================================================
// THEME
// =====================================================

function setupTheme() {

    const themeToggle = document.getElementById("themeToggle");
    const settingsThemeToggle =
        document.getElementById("settingsThemeToggle");

    const savedTheme =
        localStorage.getItem("hygieneTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            saveCurrentTheme();

            updateThemeIcon();

        });

    }


    if (settingsThemeToggle) {

        settingsThemeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            saveCurrentTheme();

            updateThemeIcon();

        });

    }

}


function saveCurrentTheme() {

    const theme =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem(
        "hygieneTheme",
        theme
    );

}


function updateThemeIcon() {

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }


    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀";

    } else {

        themeToggle.textContent = "☾";

    }

}


// =====================================================
// NAVIGATION
// =====================================================

function setupNavigation() {

    const navItems =
        document.querySelectorAll(".navigation .nav-item");


    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            const page =
                item.getAttribute("data-page");

            if (page) {

                window.location.href = page;

            }

        });

    });

}


// =====================================================
// API STATUS
// =====================================================

async function checkAPIStatus() {

    const apiStatus =
        document.getElementById("apiStatus");

    if (!apiStatus) {
        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/facilities`);

        if (!response.ok) {
            throw new Error("API unavailable");
        }


        apiStatus.classList.add("online");

        apiStatus.innerHTML = `
            <span></span>
            API Connected
        `;

    } catch (error) {

        apiStatus.classList.remove("online");

        apiStatus.innerHTML = `
            <span></span>
            API Offline
        `;

    }

}

// =====================================================
// DATASET
// =====================================================

async function loadDataset() {

    try {

        const response =
            await fetch(`${API_URL}/dataset`);

        if (!response.ok) {
            throw new Error("Unable to load dataset");
        }

        const result =
            await response.json();

        facilityDataset =
            result.records || [];

        console.log(
            "Dataset loaded:",
            facilityDataset.length,
            "records"
        );

    } catch (error) {

        console.error(
            "Dataset loading error:",
            error
        );

    }

}

// =====================================================
// DASHBOARD
// =====================================================

async function loadDashboard() {

    const facilityCount =
        document.getElementById("facilityCount");

    const predictionCount =
        document.getElementById("predictionCount");

    const highRiskCount =
        document.getElementById("highRiskCount");

    const lowRiskCount =
        document.getElementById("lowRiskCount");


    if (
        !facilityCount &&
        !predictionCount &&
        !highRiskCount &&
        !lowRiskCount
    ) {
        return;
    }


    try {

        const [
            facilitiesResponse,
            predictionsResponse
        ] = await Promise.all([

            fetch(`${API_URL}/facilities`),

            fetch(`${API_URL}/predictions`)

        ]);


        const facilities =
            await facilitiesResponse.json();

        const predictions =
            await predictionsResponse.json();


        const highRisk =
            predictions.filter(
                item =>
                    String(item.predicted_risk)
                        .toLowerCase() === "high"
            ).length;


        const lowRisk =
            predictions.filter(
                item =>
                    String(item.predicted_risk)
                        .toLowerCase() === "low"
            ).length;


        if (facilityCount) {

            facilityCount.textContent =
                facilities.length;

        }


        if (predictionCount) {

            predictionCount.textContent =
                predictions.length;

        }


        if (highRiskCount) {

            highRiskCount.textContent =
                highRisk;

        }


        if (lowRiskCount) {

            lowRiskCount.textContent =
                lowRisk;

        }


        // Risk summary

        const riskSummaryHigh =
            document.getElementById(
                "riskSummaryHigh"
            );

        const riskSummaryLow =
            document.getElementById(
                "riskSummaryLow"
            );

        const riskBarHigh =
            document.getElementById(
                "riskBarHigh"
            );


        if (riskSummaryHigh) {

            riskSummaryHigh.textContent =
                highRisk;

        }


        if (riskSummaryLow) {

            riskSummaryLow.textContent =
                lowRisk;

        }


        if (riskBarHigh) {

            const total =
                highRisk + lowRisk;


            const percentage =
                total === 0
                    ? 0
                    : (highRisk / total) * 100;


            riskBarHigh.style.width =
                `${percentage}%`;

        }


        loadRecentPredictions(predictions);
        loadFacilityList(facilities);

    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

    }

}


// =====================================================
// RECENT PREDICTIONS
// =====================================================

function loadRecentPredictions(predictions) {

    const table =
        document.getElementById(
            "recentPredictions"
        );


    if (!table) {
        return;
    }


    if (!predictions.length) {

        table.innerHTML = `
            <tr>
                <td
                    colspan="4"
                    class="empty-state"
                >
                    No predictions available yet.
                </td>
            </tr>
        `;

        return;

    }


    const recent =
        predictions.slice(0, 5);


    table.innerHTML =
        recent.map(item => {

            const risk =
                String(
                    item.predicted_risk || ""
                ).toLowerCase();


            return `
                <tr>

                    <td>
                        ${escapeHTML(
                            item.facility_id || "-"
                        )}
                    </td>

                    <td>
                        <span class="risk-badge ${risk}">
                            ${escapeHTML(
                                item.predicted_risk || "-"
                            )}
                        </span>
                    </td>

                    <td>
                        ${formatConfidence(
                            item.confidence
                        )}
                    </td>

                    <td>
                        ${formatDate(
                            item.created_at
                        )}
                    </td>

                </tr>
            `;

        }).join("");

}


// =====================================================
// FACILITY LIST ON DASHBOARD
// =====================================================

function loadFacilityList(facilities) {

    const list =
        document.getElementById(
            "facilityList"
        );


    if (!list) {
        return;
    }


    if (!facilities.length) {

        list.innerHTML = `
            <div class="empty-state">
                No facilities found.
            </div>
        `;

        return;

    }


    list.innerHTML =
        facilities.map(facility => {

            return `
                <div class="facility-item">

                    <div>

                        <strong>
                            ${escapeHTML(
                                facility.facility_id
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                facility.location
                            )}
                        </span>

                    </div>

                    <span class="facility-arrow">
                        →
                    </span>

                </div>
            `;

        }).join("");

}


// =====================================================
// ASSESSMENT
// =====================================================

function setupAssessment() {

    const form =
        document.getElementById(
            "predictionForm"
        );


    if (!form) {
        return;
    }


    populateFacilitySelect();


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            await makePrediction();

        }
    );

}


// =====================================================
// FACILITY SELECT
// =====================================================

async function populateFacilitySelect() {

    const select =
        document.getElementById(
            "facility_id"
        );


    if (!select) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/facilities`
            );


        if (!response.ok) {
            throw new Error(
                "Unable to load facilities"
            );
        }


        const facilities =
            await response.json();


        if (!facilities.length) {

            throw new Error(
                "No facilities found"
            );

        }


        select.innerHTML = `
            <option value="">
                Select facility
            </option>
        `;


        facilities.forEach(
            facility => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    facility.facility_id;


                option.textContent =
                    `${facility.facility_id} — ${facility.location}`;


                select.appendChild(option);

            }
        );


    } catch (error) {

        console.error(
            "Facility loading error:",
            error
        );


        // Fallback facilities

        const fallbackFacilities = [
            "FAC-1001",
            "FAC-1002",
            "FAC-1003",
            "FAC-1004",
            "FAC-1005"
        ];


        select.innerHTML = `
            <option value="">
                Select facility
            </option>
        `;


        fallbackFacilities.forEach(
            facilityId => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    facilityId;


                option.textContent =
                    facilityId;


                select.appendChild(option);

            }
        );

    }

}


// =====================================================
// MAKE PREDICTION
// =====================================================

async function makePrediction() {

    const form =
        document.getElementById(
            "predictionForm"
        );


    if (!form) {
        return;
    }


    const facilityId =
        document.getElementById(
            "facility_id"
        ).value;


    if (!facilityId) {

        alert(
            "Please select a facility."
        );

        return;

    }


    const inputData = {

        cleanliness_score:
            Number(
                document.getElementById(
                    "cleanliness_score"
                ).value
            ),

        odor_score:
            Number(
                document.getElementById(
                    "odor_score"
                ).value
            ),

        waste_level:
            Number(
                document.getElementById(
                    "waste_level"
                ).value
            ),

        water_availability:
            Number(
                document.getElementById(
                    "water_availability"
                ).value
            ),

        footfall:
            Number(
                document.getElementById(
                    "footfall"
                ).value
            ),

        complaints:
            Number(
                document.getElementById(
                    "complaints"
                ).value
            )

    };


    try {

        const response =
            await fetch(
                `${API_URL}/predict`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            inputData
                        )
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Prediction failed"
            );

        }


        showResult(result);


        // Save prediction

        await savePrediction(
            facilityId,
            inputData,
            result
        );

    } catch (error) {

        console.error(
            "Prediction error:",
            error
        );


        alert(
            `Prediction failed: ${error.message}`
        );

    }

}


// =====================================================
// SHOW PREDICTION RESULT
// =====================================================

function showResult(result) {

    const resultBox =
        document.getElementById(
            "result"
        );

    const predictionText =
        document.getElementById(
            "predictionText"
        );

    const confidenceText =
        document.getElementById(
            "confidenceText"
        );


    if (!resultBox) {
        return;
    }


    if (predictionText) {

        predictionText.textContent =
            result.prediction;

    }


    if (confidenceText) {

        confidenceText.textContent =
            formatConfidence(
                result.confidence
            );

    }


    resultBox.classList.remove(
        "high-result",
        "low-result"
    );


    if (
        String(result.prediction)
            .toLowerCase() === "high"
    ) {

        resultBox.classList.add(
            "high-result"
        );

    } else {

        resultBox.classList.add(
            "low-result"
        );

    }


    resultBox.classList.add(
        "show"
    );

}


// =====================================================
// SAVE PREDICTION
// =====================================================

async function savePrediction(
    facilityId,
    inputData,
    result
) {

    try {

        const response =
            await fetch(
                `${API_URL}/save-prediction`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        facility_id:
                            facilityId,

                        cleanliness_score:
                            inputData.cleanliness_score,

                        odor_score:
                            inputData.odor_score,

                        waste_level:
                            inputData.waste_level,

                        water_availability:
                            inputData.water_availability,

                        footfall:
                            inputData.footfall,

                        complaints:
                            inputData.complaints,

                        predicted_risk:
                            result.prediction,

                        confidence:
                            result.confidence

                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Could not save prediction"
            );

        }


        console.log(
            "Prediction saved:",
            data
        );


    } catch (error) {

    console.error(
        "Saving prediction failed:",
        error
    );

    alert(
        `Saving prediction failed: ${error.message}`
    );

    throw error;
}

}


// =====================================================
// PREDICTION HISTORY
// =====================================================

async function showPredictionHistory() {

    const table =
        document.getElementById(
            "historyTable"
        );


    if (!table) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/predictions`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load predictions"
            );

        }


        const predictions =
            await response.json();


        if (!predictions.length) {

            table.innerHTML = `
                <tr>

                    <td
                        colspan="7"
                        class="empty-state"
                    >
                        No prediction history available.
                    </td>

                </tr>
            `;

            return;

        }


        table.innerHTML =
            predictions.map(item => {

                const risk =
                    String(
                        item.predicted_risk || ""
                    ).toLowerCase();


                return `
                    <tr>

                        <td>
                            ${escapeHTML(
                                item.facility_id || "-"
                            )}
                        </td>

                        <td>
                            <span class="risk-badge ${risk}">
                                ${escapeHTML(
                                    item.predicted_risk || "-"
                                )}
                            </span>
                        </td>

                        <td>
                            ${item.cleanliness_score ?? "-"}
                        </td>

                        <td>
                            ${item.odor_score ?? "-"}
                        </td>

                        <td>
                            ${item.waste_level ?? "-"}
                        </td>

                        <td>
                            ${formatConfidence(
                                item.confidence
                            )}
                        </td>

                        <td>
                            ${formatDate(
                                item.created_at
                            )}
                        </td>

                    </tr>
                `;

            }).join("");


    } catch (error) {

        console.error(
            "History loading error:",
            error
        );


        table.innerHTML = `
            <tr>

                <td
                    colspan="7"
                    class="empty-state"
                >
                    Unable to load prediction history.
                </td>

            </tr>
        `;

    }

}


// =====================================================
// FACILITIES PAGE
// =====================================================

async function showFacilities() {

    const table =
        document.getElementById(
            "facilitiesTable"
        );


    if (!table) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/facilities`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load facilities"
            );

        }


        const facilities =
            await response.json();


        if (!facilities.length) {

            table.innerHTML = `
                <tr>

                    <td
                        colspan="3"
                        class="empty-state"
                    >
                        No facilities available.
                    </td>

                </tr>
            `;

            return;

        }


        table.innerHTML =
            facilities.map(
                (facility, index) => {

                    return `
                        <tr>

                            <td>
                                ${index + 1}
                            </td>

                            <td>
                                <strong>
                                    ${escapeHTML(
                                        facility.facility_id
                                    )}
                                </strong>
                            </td>

                            <td>
                                ${escapeHTML(
                                    facility.location
                                )}
                            </td>

                        </tr>
                    `;

                }
            ).join("");


    } catch (error) {

        console.error(
            "Facilities loading error:",
            error
        );


        table.innerHTML = `
            <tr>

                <td
                    colspan="3"
                    class="empty-state"
                >
                    Unable to load facilities.
                </td>

            </tr>
        `;

    }

}


// =====================================================
// ANALYTICS
// =====================================================

async function loadAnalytics() {

    const chartCanvas =
        document.getElementById(
            "riskChart"
        );


    if (!chartCanvas) {
        return;
    }


    const facilitiesCount =
        document.getElementById(
            "analyticsFacilities"
        );

    const predictionsCount =
        document.getElementById(
            "analyticsPredictions"
        );

    const highRiskCount =
        document.getElementById(
            "analyticsHighRisk"
        );

    const lowRiskCount =
        document.getElementById(
            "analyticsLowRisk"
        );


    try {

        const [
            facilitiesResponse,
            predictionsResponse
        ] = await Promise.all([

            fetch(`${API_URL}/facilities`),

            fetch(`${API_URL}/predictions`)

        ]);


        const facilities =
            await facilitiesResponse.json();

        const predictions =
            await predictionsResponse.json();


        const highRisk =
            predictions.filter(
                item =>
                    String(
                        item.predicted_risk
                    ).toLowerCase() === "high"
            ).length;


        const lowRisk =
            predictions.filter(
                item =>
                    String(
                        item.predicted_risk
                    ).toLowerCase() === "low"
            ).length;


        if (facilitiesCount) {

            facilitiesCount.textContent =
                facilities.length;

        }


        if (predictionsCount) {

            predictionsCount.textContent =
                predictions.length;

        }


        if (highRiskCount) {

            highRiskCount.textContent =
                highRisk;

        }


        if (lowRiskCount) {

            lowRiskCount.textContent =
                lowRisk;

        }


        if (
            typeof Chart === "undefined"
        ) {

            console.error(
                "Chart.js is not loaded."
            );

            return;

        }


        new Chart(
            chartCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "High Risk",
                        "Low Risk"
                    ],

                    datasets: [
                        {

                            data: [
                                highRisk,
                                lowRisk
                            ],

                            borderWidth: 0

                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "65%",

                    plugins: {

                        legend: {

                            position:
                                "bottom"

                        }

                    }

                }

            }
        );


    } catch (error) {

        console.error(
            "Analytics loading error:",
            error
        );

    }

}


// =====================================================
// SETTINGS
// =====================================================

function setupSettings() {

    const settingsThemeToggle =
        document.getElementById(
            "settingsThemeToggle"
        );


    if (!settingsThemeToggle) {
        return;
    }


    settingsThemeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );

            saveCurrentTheme();

            updateThemeIcon();

        }
    );

}


// =====================================================
// HELPERS
// =====================================================

function formatConfidence(value) {

    const number =
        Number(value);


    if (Number.isNaN(number)) {
        return "-";
    }


    return `${(
        number * 100
    ).toFixed(1)}%`;

}


function formatDate(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (Number.isNaN(
        date.getTime()
    )) {

        return String(value);

    }


    return date.toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}