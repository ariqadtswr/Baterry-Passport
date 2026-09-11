/* =========================================================
   BATTERYPASS
   Digital Battery Passport
   Frontend Prototype
   ========================================================= */


/* =========================================================
   DATABASE SIMULATION
   ========================================================= */

const defaultBatteries = [

    {
        id: "BAT-2026-0001",
        serial: "SN-AX91-001",
        manufacturer: "VoltCore Energy",
        model: "VC-400-L",
        chemistry: "NMC",

        capacity: 120,
        voltage: 400,

        power: 48,

        weight: 312,

        dimensions: "1,850 × 1,200 × 140 mm",

        manufactureDate: "2026-01-15",

        soh: 96,
        soc: 78,

        cycles: 184,

        temperature: 31,

        carbonFootprint: 2850,

        recycled: {
            lithium: 8,
            cobalt: 12,
            nickel: 10,
            aluminum: 15
        },

        status: "Active",

        location: "Bandung, Indonesia",

        lastMaintenance: "2026-08-18",

        events: [

            {
                date: "2026-09-08",
                type: "SoH Update",
                description: "Battery health updated to 96%."
            },

            {
                date: "2026-08-18",
                type: "Maintenance",
                description: "Routine battery inspection completed."
            },

            {
                date: "2026-07-22",
                type: "Charging",
                description: "Charging cycle completed."
            },

            {
                date: "2026-01-15",
                type: "Manufactured",
                description: "Battery registered and manufactured."
            }

        ]

    },


    {
        id: "BAT-2026-0002",
        serial: "SN-AX91-002",
        manufacturer: "VoltCore Energy",
        model: "VC-300-L",
        chemistry: "LFP",

        capacity: 100,
        voltage: 350,

        power: 35,

        weight: 280,

        dimensions: "1,720 × 1,150 × 135 mm",

        manufactureDate: "2026-02-11",

        soh: 91,
        soc: 63,

        cycles: 245,

        temperature: 29,

        carbonFootprint: 2200,

        recycled: {
            lithium: 10,
            cobalt: 0,
            nickel: 0,
            aluminum: 18
        },

        status: "Active",

        location: "Cimahi, Indonesia",

        lastMaintenance: "2026-08-20",

        events: [

            {
                date: "2026-09-06",
                type: "SoC Update",
                description: "Battery state of charge updated."
            },

            {
                date: "2026-08-20",
                type: "Maintenance",
                description: "Routine inspection completed."
            },

            {
                date: "2026-02-11",
                type: "Manufactured",
                description: "Battery registered."
            }

        ]

    },


    {
        id: "BAT-2026-0003",
        serial: "SN-BX32-009",
        manufacturer: "EcoCell",
        model: "EC-NMC-500",
        chemistry: "NMC",

        capacity: 150,
        voltage: 500,

        power: 75,

        weight: 410,

        dimensions: "2,100 × 1,300 × 150 mm",

        manufactureDate: "2025-11-22",

        soh: 84,
        soc: 45,

        cycles: 422,

        temperature: 36,

        carbonFootprint: 3470,

        recycled: {
            lithium: 6,
            cobalt: 15,
            nickel: 12,
            aluminum: 10
        },

        status: "Active",

        location: "Jakarta, Indonesia",

        lastMaintenance: "2026-08-02",

        events: [

            {
                date: "2026-09-01",
                type: "Health Warning",
                description: "SoH decreased below 85%."
            },

            {
                date: "2026-08-02",
                type: "Maintenance",
                description: "Battery diagnostic inspection completed."
            },

            {
                date: "2025-11-22",
                type: "Manufactured",
                description: "Battery registered."
            }

        ]

    },


    {
        id: "BAT-2026-0004",
        serial: "SN-CZ44-014",
        manufacturer: "PowerMatrix",
        model: "PM-LFP-250",
        chemistry: "LFP",

        capacity: 80,
        voltage: 300,

        power: 24,

        weight: 230,

        dimensions: "1,500 × 950 × 120 mm",

        manufactureDate: "2025-09-17",

        soh: 74,
        soc: 31,

        cycles: 690,

        temperature: 42,

        carbonFootprint: 1950,

        recycled: {
            lithium: 14,
            cobalt: 0,
            nickel: 0,
            aluminum: 22
        },

        status: "Maintenance",

        location: "Bogor, Indonesia",

        lastMaintenance: "2026-09-03",

        events: [

            {
                date: "2026-09-03",
                type: "Maintenance",
                description: "Battery sent for maintenance because SoH dropped below 80%."
            },

            {
                date: "2026-08-29",
                type: "Temperature Warning",
                description: "Operating temperature reached 42°C."
            },

            {
                date: "2025-09-17",
                type: "Manufactured",
                description: "Battery registered."
            }

        ]

    }

];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

let batteries =
    JSON.parse(
        localStorage.getItem("batteryPassportData")
    ) || defaultBatteries;


function saveBatteries() {

    localStorage.setItem(
        "batteryPassportData",
        JSON.stringify(batteries)
    );

}


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let selectedBattery = batteries[0];


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeNavigation();

        initializeButtons();

        initializeSearch();

        renderDashboard();

        renderBatteryTable();

        renderHistory();

        showPage("dashboard");

    }
);


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    document
        .querySelectorAll("[data-page]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        button.dataset.page;

                    showPage(page);

                }
            );

        });

}


function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove(
                "active-page"
            );

        });


    const target =
        document.getElementById(
            `${page}Page`
        );


    if (target) {

        target.classList.add(
            "active-page"
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    if (page === "dashboard") {

        renderDashboard();

    }


    if (page === "batteries") {

        renderBatteryTable();

    }


    if (page === "history") {

        renderHistory();

    }

}


/* =========================================================
   BUTTONS
   ========================================================= */

function initializeButtons() {

    const addButton =
        document.getElementById(
            "addBatteryButton"
        );


    if (addButton) {

        addButton.addEventListener(
            "click",
            openBatteryModal
        );

    }


    const dashboardAdd =
        document.getElementById(
            "openPassportButton"
        );


    if (dashboardAdd) {

        dashboardAdd.addEventListener(
            "click",
            openBatteryModal
        );

    }


    document
        .getElementById(
            "closeBatteryModal"
        )
        .addEventListener(
            "click",
            closeBatteryModal
        );


    document
        .getElementById(
            "cancelBattery"
        )
        .addEventListener(
            "click",
            closeBatteryModal
        );


    document
        .getElementById(
            "batteryForm"
        )
        .addEventListener(
            "submit",
            handleBatterySubmit
        );


    document
        .getElementById(
            "backToBatteries"
        )
        .addEventListener(
            "click",
            () => showPage("batteries")
        );


    document
        .getElementById(
            "printPassport"
        )
        .addEventListener(
            "click",
            () => window.print()
        );


    document
        .getElementById(
            "downloadPassport"
        )
        .addEventListener(
            "click",
            exportPassport
        );


    document
        .getElementById(
            "batteryModal"
        )
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "batteryModal"
                ) {

                    closeBatteryModal();

                }

            }
        );

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

    const total =
        batteries.length;


    const active =
        batteries.filter(
            battery =>
                battery.status === "Active"
        ).length;


    const attention =
        batteries.filter(
            battery =>
                battery.soh < 80
        ).length;


    const average =
        total
            ? Math.round(
                batteries.reduce(
                    (sum, battery) =>
                        sum + battery.soh,
                    0
                ) / total
            )
            : 0;


    document
        .getElementById(
            "totalBatteries"
        )
        .textContent = total;


    document
        .getElementById(
            "activeBatteries"
        )
        .textContent = active;


    document
        .getElementById(
            "attentionBatteries"
        )
        .textContent = attention;


    document
        .getElementById(
            "averageSOH"
        )
        .textContent = average;


    document
        .getElementById(
            "averageSOHBar"
        )
        .style.width =
        `${average}%`;


    renderDashboardBatteryTable();

    renderHealthChart();

    renderRecentActivity();

}


/* =========================================================
   DASHBOARD TABLE
   ========================================================= */

function renderDashboardBatteryTable() {

    const table =
        document.getElementById(
            "dashboardBatteryTable"
        );


    table.innerHTML = "";


    batteries
        .slice(0, 5)
        .forEach(
            battery => {

                table.innerHTML +=
                    createBatteryRow(
                        battery,
                        true
                    );

            }
        );

}


/* =========================================================
   BATTERY TABLE
   ========================================================= */

function renderBatteryTable(
    customData = batteries
) {

    const table =
        document.getElementById(
            "batteryTable"
        );


    if (!table) return;


    table.innerHTML = "";


    if (
        customData.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    style="text-align:center;padding:35px;color:#98a2b3;"
                >
                    No battery found.
                </td>

            </tr>

        `;

        return;

    }


    customData.forEach(
        battery => {

            table.innerHTML +=
                createBatteryRow(
                    battery,
                    false
                );

        }
    );

}


/* =========================================================
   BATTERY ROW
   ========================================================= */

function createBatteryRow(
    battery,
    compact = false
) {

    const healthClass =
        getHealthClass(
            battery.soh
        );


    const statusClass =
        getStatusClass(
            battery.status
        );


    if (compact) {

        return `

            <tr>

                <td>

                    <div class="battery-name">

                        <div class="battery-icon">
                            ⚡
                        </div>

                        <div>

                            <strong>
                                ${battery.id}
                            </strong>

                            <small>
                                ${battery.serial}
                            </small>

                        </div>

                    </div>

                </td>

                <td>
                    ${battery.manufacturer}
                </td>

                <td>
                    ${battery.chemistry}
                </td>

                <td>

                    <span
                        class="health-value ${healthClass}"
                    >
                        ${battery.soh}%
                    </span>

                </td>

                <td>
                    ${battery.soc}%
                </td>

                <td>

                    <span
                        class="badge ${statusClass}"
                    >
                        ${battery.status}
                    </span>

                </td>

                <td>

                    <button
                        class="text-button"
                        onclick="openPassport('${battery.id}')"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;

    }


    return `

        <tr>

            <td>
                <strong>
                    ${battery.id}
                </strong>
            </td>

            <td>
                ${battery.serial}
            </td>

            <td>
                ${battery.manufacturer}
            </td>

            <td>
                ${battery.chemistry}
            </td>

            <td>
                ${battery.capacity} Ah
            </td>

            <td>

                <span
                    class="health-value ${healthClass}"
                >
                    ${battery.soh}%
                </span>

            </td>

            <td>
                ${battery.soc}%
            </td>

            <td>

                <span
                    class="badge ${statusClass}"
                >
                    ${battery.status}
                </span>

            </td>

            <td>

                <button
                    class="text-button"
                    onclick="openPassport('${battery.id}')"
                >
                    Passport →
                </button>

            </td>

        </tr>

    `;

}


/* =========================================================
   HEALTH CLASS
   ========================================================= */

function getHealthClass(soh) {

    if (soh >= 90) {

        return "health-good";

    }

    if (soh >= 80) {

        return "health-medium";

    }

    return "health-critical";

}


function getStatusClass(status) {

    if (status === "Active") {

        return "badge-active";

    }

    if (status === "Maintenance") {

        return "badge-maintenance";

    }

    return "badge-retired";

}


/* =========================================================
   HEALTH CHART
   ========================================================= */

function renderHealthChart() {

    const total =
        batteries.length;


    if (!total) return;


    const healthy =
        batteries.filter(
            battery =>
                battery.soh >= 90
        ).length;


    const moderate =
        batteries.filter(
            battery =>
                battery.soh >= 80 &&
                battery.soh < 90
        ).length;


    const critical =
        batteries.filter(
            battery =>
                battery.soh < 80
        ).length;


    const healthyPercent =
        Math.round(
            (healthy / total) * 100
        );


    const moderatePercent =
        Math.round(
            (moderate / total) * 100
        );


    const healthyEnd =
        healthyPercent;


    const moderateEnd =
        healthyPercent +
        moderatePercent;


    document
        .getElementById(
            "healthyPercentage"
        )
        .textContent =
        `${healthyPercent}%`;


    document
        .getElementById(
            "healthDonut"
        )
        .style.background = `conic-gradient(
            #22c55e 0% ${healthyEnd}%,
            #f59e0b ${healthyEnd}% ${moderateEnd}%,
            #ef4444 ${moderateEnd}% 100%
        )`;

}


/* =========================================================
   RECENT ACTIVITY
   ========================================================= */

function renderRecentActivity() {

    const container =
        document.getElementById(
            "recentActivity"
        );


    const activities = [];


    batteries.forEach(
        battery => {

            battery.events
                .slice(0, 2)
                .forEach(
                    event => {

                        activities.push({

                            battery:
                                battery.id,

                            ...event

                        });

                    }
                );

        }
    );


    activities.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    container.innerHTML =
        activities
            .slice(0, 6)
            .map(
                activity => `

                    <div class="activity-item">

                        <div class="activity-marker">
                            ${getActivityIcon(
                                activity.type
                            )}
                        </div>

                        <div>

                            <strong>
                                ${activity.type}
                            </strong>

                            <p>
                                ${activity.description}
                            </p>

                            <small>
                                ${activity.battery}
                                ·
                                ${formatDate(
                                    activity.date
                                )}
                            </small>

                        </div>

                    </div>

                `
            )
            .join("");

}


function getActivityIcon(type) {

    if (
        type.includes("Warning")
    ) {

        return "!";

    }

    if (
        type.includes("Maintenance")
    ) {

        return "⚙";

    }

    if (
        type.includes("Charging")
    ) {

        return "⚡";

    }

    return "✓";

}


/* =========================================================
   BATTERY PASSPORT
   ========================================================= */

function openPassport(
    batteryId
) {

    const battery =
        batteries.find(
            item =>
                item.id === batteryId
        );


    if (!battery) return;


    selectedBattery =
        battery;


    renderPassport(
        battery
    );


    showPage("passport");

}


function renderPassport(
    battery
) {

    const container =
        document.getElementById(
            "passportContent"
        );


    const healthClass =
        getHealthClass(
            battery.soh
        );


    container.innerHTML = `

        <!-- COVER -->

        <div class="passport-cover">

            <div>

                <div class="passport-id">
                    DIGITAL BATTERY PASSPORT
                </div>

                <h2>
                    ${battery.id}
                </h2>

                <p>
                    ${battery.manufacturer}
                    ·
                    ${battery.model}
                    ·
                    ${battery.chemistry}
                </p>

                <div class="passport-status">

                    <span
                        class="badge ${getStatusClass(
                            battery.status
                        )}"
                    >
                        ${battery.status}
                    </span>

                </div>

            </div>


            <div
                class="passport-qr"
                id="passportQR"
            ></div>

        </div>


        <div class="passport-grid">


            <!-- HEALTH -->

            <section class="passport-section full">

                <h3>
                    Battery Health
                </h3>

                <p>
                    Current battery health and operational condition.
                </p>


                <div class="health-overview">

                    <div class="health-metric">

                        <strong
                            class="${healthClass}"
                        >
                            ${battery.soh}%
                        </strong>

                        <span>
                            State of Health
                        </span>

                        <div class="health-meter">

                            <div
                                style="width:${battery.soh}%"
                            ></div>

                        </div>

                    </div>


                    <div class="health-metric">

                        <strong>
                            ${battery.soc}%
                        </strong>

                        <span>
                            State of Charge
                        </span>

                        <div class="health-meter">

                            <div
                                style="width:${battery.soc}%"
                            ></div>

                        </div>

                    </div>


                    <div class="health-metric">

                        <strong>
                            ${battery.cycles}
                        </strong>

                        <span>
                            Charge Cycles
                        </span>

                    </div>

                </div>

            </section>


            <!-- GENERAL INFORMATION -->

            <section class="passport-section">

                <h3>
                    General Information
                </h3>

                <p>
                    Battery identity and manufacturing information.
                </p>


                <div class="data-grid">

                    <div class="data-item">

                        <span>
                            Battery ID
                        </span>

                        <strong>
                            ${battery.id}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Serial Number
                        </span>

                        <strong>
                            ${battery.serial}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Manufacturer
                        </span>

                        <strong>
                            ${battery.manufacturer}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Model
                        </span>

                        <strong>
                            ${battery.model}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Chemistry
                        </span>

                        <strong>
                            ${battery.chemistry}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Manufacture Date
                        </span>

                        <strong>
                            ${formatDate(
                                battery.manufactureDate
                            )}
                        </strong>

                    </div>

                </div>

            </section>


            <!-- TECHNICAL -->

            <section class="passport-section">

                <h3>
                    Technical Specification
                </h3>

                <p>
                    Electrical and physical characteristics.
                </p>


                <div class="data-grid">

                    <div class="data-item">

                        <span>
                            Nominal Capacity
                        </span>

                        <strong>
                            ${battery.capacity} Ah
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Nominal Voltage
                        </span>

                        <strong>
                            ${battery.voltage} V
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Maximum Power
                        </span>

                        <strong>
                            ${battery.power} kW
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Weight
                        </span>

                        <strong>
                            ${battery.weight} kg
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Dimensions
                        </span>

                        <strong>
                            ${battery.dimensions}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Operating Temperature
                        </span>

                        <strong>
                            ${battery.temperature} °C
                        </strong>

                    </div>

                </div>

            </section>


            <!-- CARBON -->

            <section class="passport-section">

                <h3>
                    Carbon Footprint
                </h3>

                <p>
                    Estimated lifecycle greenhouse gas emissions.
                </p>


                <div class="carbon-card">

                    <div>

                        <div class="carbon-value">
                            ${battery.carbonFootprint}
                        </div>

                        <div class="carbon-unit">
                            kg CO₂e / battery
                        </div>

                    </div>

                    <div class="carbon-note">

                        Includes estimated emissions associated
                        with raw material extraction,
                        manufacturing and distribution.

                    </div>

                </div>

            </section>


            <!-- RECYCLED MATERIAL -->

            <section class="passport-section">

                <h3>
                    Recycled Material Content
                </h3>

                <p>
                    Percentage of recycled material incorporated into the battery.
                </p>


                <div class="table-container">

                    <table class="material-table">

                        <thead>

                            <tr>

                                <th>
                                    Material
                                </th>

                                <th>
                                    Recycled Content
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    Lithium
                                </td>

                                <td>
                                    ${battery.recycled.lithium}%
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    Cobalt
                                </td>

                                <td>
                                    ${battery.recycled.cobalt}%
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    Nickel
                                </td>

                                <td>
                                    ${battery.recycled.nickel}%
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    Aluminum
                                </td>

                                <td>
                                    ${battery.recycled.aluminum}%
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </section>


            <!-- LOCATION -->

            <section class="passport-section">

                <h3>
                    Traceability
                </h3>

                <p>
                    Current battery location and maintenance information.
                </p>


                <div class="data-grid">

                    <div class="data-item">

                        <span>
                            Current Location
                        </span>

                        <strong>
                            ${battery.location}
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Last Maintenance
                        </span>

                        <strong>
                            ${formatDate(
                                battery.lastMaintenance
                            )}
                        </strong>

                    </div>

                </div>

            </section>


            <!-- END OF LIFE -->

            <section class="passport-section">

                <h3>
                    End-of-Life Information
                </h3>

                <p>
                    Information for second-life assessment and recycling.
                </p>


                <div class="data-grid">

                    <div class="data-item">

                        <span>
                            Second-Life Eligibility
                        </span>

                        <strong>
                            ${
                                battery.soh >= 80
                                ? "Potentially Eligible"
                                : "Requires Assessment"
                            }
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Recycling Route
                        </span>

                        <strong>
                            Authorized Recycler
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Safety Classification
                        </span>

                        <strong>
                            Lithium Battery
                        </strong>

                    </div>


                    <div class="data-item">

                        <span>
                            Disassembly
                        </span>

                        <strong>
                            Certified Technician Required
                        </strong>

                    </div>

                </div>

            </section>


            <!-- HISTORY -->

            <section class="passport-section full">

                <h3>
                    Battery History
                </h3>

                <p>
                    Recorded events throughout the battery lifecycle.
                </p>


                <div class="timeline">

                    ${battery.events
                        .map(
                            event => `

                                <div class="timeline-item">

                                    <div class="timeline-date">
                                        ${formatDate(
                                            event.date
                                        )}
                                    </div>

                                    <div class="timeline-line">

                                        <div class="timeline-dot">
                                        </div>

                                    </div>

                                    <div class="timeline-content">

                                        <strong>
                                            ${event.type}
                                        </strong>

                                        <p>
                                            ${event.description}
                                        </p>

                                    </div>

                                </div>

                            `
                        )
                        .join("")}

                </div>

            </section>

        </div>

    `;


    generateQR(
        battery
    );

}


/* =========================================================
   QR CODE
   ========================================================= */

function generateQR(
    battery
) {

    const container =
        document.getElementById(
            "passportQR"
        );


    if (!container) return;


    container.innerHTML = "";


    const passportURL =
        `${window.location.origin}${window.location.pathname}?battery=${encodeURIComponent(
            battery.id
        )}`;


    if (
        typeof QRCode !== "undefined"
    ) {

        new QRCode(
            container,
            {
                text: passportURL,
                width: 125,
                height: 125
            }
        );

    } else {

        container.innerHTML = `
            <div
                style="
                    color:#172033;
                    font-size:10px;
                    text-align:center;
                "
            >
                QR library unavailable
            </div>
        `;

    }

}


/* =========================================================
   HISTORY
   ========================================================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyTimeline"
        );


    const events = [];


    batteries.forEach(
        battery => {

            battery.events.forEach(
                event => {

                    events.push({

                        battery:
                            battery.id,

                        ...event

                    });

                }
            );

        }
    );


    events.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    container.innerHTML =
        events
            .map(
                event => `

                    <div class="timeline-item">

                        <div class="timeline-date">

                            ${formatDate(
                                event.date
                            )}

                            <br>

                            <small>
                                ${event.battery}
                            </small>

                        </div>


                        <div class="timeline-line">

                            <div class="timeline-dot">
                            </div>

                        </div>


                        <div class="timeline-content">

                            <strong>
                                ${event.type}
                            </strong>

                            <p>
                                ${event.description}
                            </p>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   SEARCH
   ========================================================= */

function initializeSearch() {

    const batterySearch =
        document.getElementById(
            "batterySearch"
        );


    const chemistryFilter =
        document.getElementById(
            "chemistryFilter"
        );


    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    function filterBatteries() {

        const search =
            batterySearch.value
                .toLowerCase()
                .trim();


        const chemistry =
            chemistryFilter.value;


        const status =
            statusFilter.value;


        const filtered =
            batteries.filter(
                battery => {

                    const matchesSearch =
                        !search ||

                        battery.id
                            .toLowerCase()
                            .includes(search) ||

                        battery.serial
                            .toLowerCase()
                            .includes(search) ||

                        battery.manufacturer
                            .toLowerCase()
                            .includes(search);


                    const matchesChemistry =
                        chemistry === "all" ||
                        battery.chemistry === chemistry;


                    const matchesStatus =
                        status === "all" ||
                        battery.status === status;


                    return (
                        matchesSearch &&
                        matchesChemistry &&
                        matchesStatus
                    );

                }
            );


        renderBatteryTable(
            filtered
        );

    }


    batterySearch.addEventListener(
        "input",
        filterBatteries
    );


    chemistryFilter.addEventListener(
        "change",
        filterBatteries
    );


    statusFilter.addEventListener(
        "change",
        filterBatteries
    );


    const globalSearch =
        document.getElementById(
            "globalSearch"
        );


    globalSearch.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) return;


            const query =
                globalSearch.value
                    .toLowerCase()
                    .trim();


            if (!query) return;


            const found =
                batteries.find(
                    battery =>
                        battery.id
                            .toLowerCase()
                            .includes(query) ||

                        battery.serial
                            .toLowerCase()
                            .includes(query)
                );


            if (found) {

                openPassport(
                    found.id
                );

            } else {

                showToast(
                    "Battery not found.",
                    "!"
                );

            }

        }
    );

}


/* =========================================================
   MODAL
   ========================================================= */

function openBatteryModal() {

    document
        .getElementById(
            "batteryModal"
        )
        .classList.add("show");

}


function closeBatteryModal() {

    document
        .getElementById(
            "batteryModal"
        )
        .classList.remove("show");

}


/* =========================================================
   ADD BATTERY
   ========================================================= */

function handleBatterySubmit(
    event
) {

    event.preventDefault();


    const form =
        event.target;


    const data =
        new FormData(form);


    const battery = {

        id:
            data.get("id").trim(),

        serial:
            data.get("serial").trim(),

        manufacturer:
            data.get("manufacturer").trim(),

        model:
            data.get("model").trim(),

        chemistry:
            data.get("chemistry"),

        capacity:
            Number(
                data.get("capacity")
            ),

        voltage:
            Number(
                data.get("voltage")
            ),

        power:
            Number(
                data.get("voltage")
            ) *
            Number(
                data.get("capacity")
            ) /
            1000,

        weight: 0,

        dimensions:
            "Not specified",

        manufactureDate:
            new Date()
                .toISOString()
                .split("T")[0],

        soh:
            Number(
                data.get("soh")
            ),

        soc:
            Number(
                data.get("soc")
            ),

        cycles:
            Number(
                data.get("cycles")
            ),

        temperature:
            25,

        carbonFootprint:
            0,

        recycled: {

            lithium: 0,

            cobalt: 0,

            nickel: 0,

            aluminum: 0

        },

        status: "Active",

        location:
            "Not specified",

        lastMaintenance:
            new Date()
                .toISOString()
                .split("T")[0],

        events: [

            {

                date:
                    new Date()
                        .toISOString()
                        .split("T")[0],

                type:
                    "Registered",

                description:
                    "Battery registered in Battery Passport system."

            }

        ]

    };


    const duplicate =
        batteries.some(
            item =>
                item.id === battery.id
        );


    if (duplicate) {

        showToast(
            "Battery ID already exists.",
            "!"
        );

        return;

    }


    batteries.unshift(
        battery
    );


    saveBatteries();


    form.reset();


    closeBatteryModal();


    renderDashboard();

    renderBatteryTable();

    renderHistory();


    showToast(
        "Battery registered successfully."
    );

}


/* =========================================================
   EXPORT
   ========================================================= */

function exportPassport() {

    if (!selectedBattery) return;


    const battery =
        selectedBattery;


    const passport = {

        batteryPassport: {

            id:
                battery.id,

            serialNumber:
                battery.serial,

            manufacturer:
                battery.manufacturer,

            model:
                battery.model,

            chemistry:
                battery.chemistry,

            manufactureDate:
                battery.manufactureDate,

            technicalSpecification: {

                capacityAh:
                    battery.capacity,

                voltageV:
                    battery.voltage,

                powerKW:
                    battery.power,

                weightKg:
                    battery.weight,

                dimensions:
                    battery.dimensions

            },

            health: {

                soh:
                    battery.soh,

                soc:
                    battery.soc,

                cycleCount:
                    battery.cycles,

                temperatureC:
                    battery.temperature

            },

            sustainability: {

                carbonFootprintKgCO2e:
                    battery.carbonFootprint,

                recycledMaterial:
                    battery.recycled

            },

            traceability: {

                location:
                    battery.location,

                lastMaintenance:
                    battery.lastMaintenance

            },

            history:
                battery.events

        }

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    passport,
                    null,
                    4
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download =
        `${battery.id}-battery-passport.json`;


    document
        .body
        .appendChild(link);


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Battery Passport exported."
    );

}


/* =========================================================
   UTILITIES
   ========================================================= */

function formatDate(
    date
) {

    if (!date) return "-";


    const parsed =
        new Date(date);


    return parsed.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function showToast(
    message,
    icon = "✓"
) {

    const toast =
        document.getElementById(
            "toast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    const toastIcon =
        document.getElementById(
            "toastIcon"
        );


    toastMessage.textContent =
        message;


    toastIcon.textContent =
        icon;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =========================================================
   QR DIRECT ACCESS
   ========================================================= */

function checkURLBattery() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const batteryId =
        params.get(
            "battery"
        );


    if (!batteryId) return;


    const battery =
        batteries.find(
            item =>
                item.id === batteryId
        );


    if (battery) {

        openPassport(
            battery.id
        );

    }

}


/* =========================================================
   START
   ========================================================= */

setTimeout(
    checkURLBattery,
    100
);