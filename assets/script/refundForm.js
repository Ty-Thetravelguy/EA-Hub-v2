var consultFirstName;
var consultSurname;
var consultantEmail;
var travellerName;
var dateOfTravel;
var travelTypeRefund;
var airRefundType;
var airReasonForVoid;
var airReasonForRefund;
var flightNDC;
var flightNDCSection;
var bookingSystem;
var processedAutomatically;
var airSupplier;
var airSupplierRef;
var airTicketNo;
var localCurrenyRefundAmount;
var refundAmountGBP;
var refundBackToClient;
var markUpBackToClient;
var airNeedToKnow;

document.addEventListener('DOMContentLoaded', function () {
    refundApplication();
})


function refundApplication() {
    document.getElementById('travelTypeRefund').addEventListener('change', function () {
        const numberOfPeople = document.getElementById('numberOfPeopleRefund').value;
        clearFlightSections();

        if (this.value === 'Flight') {
            airRefund();
        } else if (this.value === 'Accommodation') {
            accommodationRefund();
        } else if (this.value === 'Car hire & taxi') {
            carHireAndTaxiRefund();
        } else if (this.value === 'Rail') {
            railRefund();
        } else if (this.value === 'Ancillary') {
            ancillaryRefund();
        }
    });

    const airRefund = () => {

        const airRefundField = document.getElementById('airRefundTypeSection');
        airRefundField.innerHTML = "";
        airRefundField.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="airRefundType">Select refund type for Flight:</label>
                    <select class="form-control" id="airRefundType" required>
                        <option value="" selected disabled>Please Select</option>
                        <option value="Void">Void</option>
                        <option value="Full">Full</option>
                        <option value="Partial">Partial</option>
                        <option value="Tax only">Tax only</option>
                    </select>
            </div>
            `;

        document.getElementById('airRefundType').addEventListener('change', function () {
            const airReasonForVoidSection = document.getElementById('airReasonForVoidSection');
            const airReasonForRefundSection = document.getElementById('airReasonForRefundSection');

            airReasonForVoidSection.innerHTML = '';
            airReasonForRefundSection.innerHTML = '';

            if (this.value === 'Void') {
                airReasonForVoidSection.innerHTML = `
                        <div class="pt-3">
                            <label class="form-group" for="airReasonForVoid">Reason for Void:</label>
                            <select class="form-control" id="airReasonForVoid" required>
                                <option value="" selected disabled>Please Select</option>
                                <option value="Agent Error">Agent Error</option>
                                <option value="Client Error">Client Error</option>
                                <option value="Agent request – Higher profit booking">Agent request – Higher profit booking</option>    
                            </select>
                        </div>
                    `;
                document.getElementById('airReasonForVoid').addEventListener('change', flightNDCSectionQuestion);

            } else {
                airReasonForRefundSection.innerHTML = `
                        <div class="pt-3">
                            <label class="form-group" for="airReasonForRefund">Reason for Refund:</label>
                                <select class="form-control" id="airReasonForRefund" required>
                                    <option value="" selected disabled>Please Select</option>
                                    <option value="Client's request - Change of plans">Client's request - Change of plans</option>
                                    <option value="Agent Error">Agent Error</option>
                                    <option value="Involuntary Change">Involuntary Change</option>
                                    <option value="Official government travel advice">Official government travel advice</option>
                                    <option value="Supplier issue">Supplier issue</option>
                                </select>
                        </div>
                    `;
                document.getElementById('airReasonForRefund').addEventListener('change', flightNDCSectionQuestion);
            };
        });

        const flightNDCSectionQuestion = () => {
            const flightNDCSection = document.getElementById('flightNDCSection');
            flightNDCSection.innerHTML = "";
            flightNDCSection.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="flightNDC">Is this an NDC flight?</label>
                <select class="form-control" id="flightNDC" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            `;

            document.getElementById('flightNDC').addEventListener('change', function () {
                const processedAutomaticallySection = document.getElementById('processedAutomaticallySection');
                processedAutomaticallySection.innerHTML = "";
                if (this.value === "Yes") {
                    processedAutomaticallySection.innerHTML = `
                    <div class="pt-3">
                        <label class="form-group" for="processedAutomatically">Was the void or refund processed automatically or processed by the airline?</label>
                        <select class="form-control" id="processedAutomatically" required>
                            <option value="" selected disabled>Please Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    `;

                    document.getElementById('processedAutomatically').addEventListener('change', function () {
                        const bookingSystemSection = document.getElementById('bookingSystemSection');
                        bookingSystemSection.innerHTML = "";
                        if (this.value === "No") {
                            bookingSystemSection.innerHTML = `
                            <div class="pt-3">
                                <label class="form-group" for="bookingSystem">Was this booked in Amadeus or Atriis?</label>
                                <select class="form-control" id="bookingSystem" required>
                                    <option value="" selected disabled>Please Select</option>
                                    <option value="Amadeus">Amadeus</option>
                                    <option value="Atriis">Atriis</option>
                                </select>
                            </div>`;

                            document.getElementById('bookingSystem').addEventListener('change', function () {
                                ndcRef();
                            })
                        } else {
                            ndcRef();
                        };
                    });

                } else {
                    nonNdcSuppliers();
                }
            });
        };

        function ndcRef() {
            const ndcRefSection = document.getElementById('ndcSupplierRefSection');
            ndcRefSection.innerHTML = "";
            ndcRefSection.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="ndcSupplierReference">Supplier Reference</label>
                <input class="form-control" type="text" id="ndcSupplierReference"
                    placeholder="Amadeues PNR, else if Atriis, Supplier PNR" required>
            </div>`;
            airRefundDataInput();
        };

        function nonNdcSuppliers() {
            const airSupplierSectionSelect = document.getElementById('airSupplierSection');
            airSupplierSectionSelect.innerHTML = "";
            airSupplierSectionSelect.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="airSupplier">Select the supplier:</label>
                <select class="form-control" id="airSupplier" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="BSP">BSP - Issued in our office ID</option>
                    <option value="eGlobal">eGlobal</option>
                    <option value="Mainstreet">Mainstreet</option>
                    <option value="Brightsun">Brightsun</option>
                    <option value="Fare Mine">Fare Mine</option>
                    <option value="Travelfusion">Travelfusion</option>
                    <option value="Airlines website">Airlines website</option>
                </select>
            </div>`;

            document.getElementById('airSupplier').addEventListener('change', function () {
                const selectValue = this.value;
                const selectedOptionText = this.options[this.selectedIndex].text;

                let placeholderText = "";
                if (selectValue === "BSP") {
                    placeholderText = "Amadeus PNR Reference"
                } else if (selectValue === "Airlines website") {
                    placeholderText = "Airlines Reference"
                } else if (selectValue === "eGlobal") {
                    placeholderText = "eGlobals Supplier PNR"
                } else if (selectValue === "Fare Mine") {
                    placeholderText = "Amadeus PNR or Fare Mine portal reference"
                } else {
                    placeholderText = `${selectedOptionText} reference`;
                };

                const airSupplierInput = document.getElementById('airSupplierRef');
                airSupplierInput.innerHTML = `
                <div class="pt-3">
                    <label class="form-group input-wrapper" for="airSupplerRef">Supplier Reference</label>
                    <input class="form-control" type="text" id="airSupplerRef" placeholder="${placeholderText}" required>
                </div>`;

                airRefundDataInput();
            });
        };

        function airRefundDataInput() {
            airRefundData.innerHTML = "";

            // Generate HTML for the ticket number input fields based on the number of travellers
            const numberOfPeopleRefund = document.getElementById('numberOfPeopleRefund').value;
            let ticketNumberHTML = '';
            for (let i = 0; i < numberOfPeopleRefund; i++) {
                ticketNumberHTML += `
                    <div id="ticketNumberSection${i + 1}" class="pt-3">
                        <label class="form-group" for="nameAirTicket${i + 1}">Enter traveller ${i + 1}'s name and ticket number</label>
                        <input class="form-control" type="text" id="nameAirTicket${i + 1}" placeholder="Name of traveller ${i + 1}" required>
                        <input class="form-control mt-2" type="text" id="airTicketNo${i + 1}" placeholder="EG. 125-1234567890" required>
                    </div>
                `;
            }

            // Generate HTML for other input fields
            const otherInputsHTML = `
                <div class="pt-3">
                    <label class="form-group" for="localCurrenyRefundAmount">Local currency refund amount if applicable:</label>
                    <input class="form-control" type="text" id="localCurrenyRefundAmount" placeholder="Enter if known.">
                </div>
                <div class="pt-3">
                    <label class="form-group" for="refundAmountGBP">Refund amount due to EA in GBP</label>
                    <input class="form-control" type="text" id="refundAmountGBP" placeholder="Enter the amount we will be receiving in GBP." required>
                </div>
                <div class="pt-4">
                    <label class="form-group">Is the refund going back to the client?</label>
                    <div>
                        <input type="radio" id="refundBackToClientYes" name="refundBackToClient" value="Yes" required>
                        <label for="refundBackToClientYes">Yes</label>
                        <input type="radio" id="refundBackToClientNo" name="refundBackToClient" value="No" required>
                        <label for="refundBackToClientNo">No</label>
                    </div>
                </div>
                <div class="pt-3">
                    <label class="form-group">Does your markup need to be refunded?</label>
                    <div>
                        <input type="radio" id="markUpBackToClientYes" name="markUpBackToClient" value="Yes" required>
                        <label for="markUpBackToClientYes">Yes</label>
                        <input type="radio" id="markUpBackToClientNo" name="markUpBackToClient" value="No" required>
                        <label for="markUpBackToClientNo">No</label>
                    </div>
                </div>
                <div class="pt-3">
                    <label class="form-group" for="airNeedToKnow">Is there anything else we need to know?</label>
                    <textarea class="form-control" name="airNeedToKnow" id="airNeedToKnow" cols="80" rows="10" placeholder="Waiver codes, details of the flight which has been cancelled by the airlines for which you need a refund, or the amount you want to keep but are still giving your client something back"></textarea>
                </div>
                <div class="row justify-content-between pt-3">
                    <div class="col-2">
                        <input type="submit" class="btn btn-success btn-lg" value="Submit">
                    </div>
                    <div class="col-2">
                        <input type="reset" id="resetButton" class="btn btn-danger btn-lg" value="Reset">
                    </div>
                </div>
            `;

            // Combine all HTML and set it to airRefundData
            airRefundData.innerHTML = ticketNumberHTML + otherInputsHTML;

            // Add ticket number validation for each dynamically generated input field
            for (let i = 0; i < numberOfPeopleRefund; i++) {
                const airTicketInput = document.getElementById(`airTicketNo${i + 1}`);
                const ticketNumberPattern = /^\d{3}-\d{10}$/;

                airTicketInput.addEventListener('input', function () {
                    const inputValue = this.value;
                    // Check if the input matches the pattern
                    if (ticketNumberPattern.test(inputValue)) {
                        // Valid ticket number
                        this.setCustomValidity('');
                    } else {
                        // Invalid ticket number
                        this.setCustomValidity('Please enter a valid ticket number (e.g., 125-1234567890)');
                    }
                });
            }

            // Reset button functionality
            document.getElementById('resetButton').addEventListener('click', function () {
                // Reloads the current page
                window.location.reload();
            });
        }

    };

    const accommodationRefund = () => {

        const reasonRefundAccomField = document.getElementById('reasonRefundAccomSection')
        reasonRefundAccomField.innerHTML = "";
        reasonRefundAccomField.innerHTML = `
            <div class="pt-3">
            <label class="form-group" for="reasonRefundAccom">Reason for Refund:</label>
                <select class="form-control" id="reasonRefundAccom" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Client's request - Change of plans">Client's request - Change of plans</option>
                    <option value="Incorrectly booked - Agent error">Incorrectly booked - Agent error</option>
                    <option value="Incorrectly booked - Client error">Incorrectly booked - Client error</option>
                    <option value="Official government travel advice">Official government travel advice</option>
                    <option value="Supplier issue">Supplier issue</option>
                </select>
            </div>
        `;

        document.getElementById('reasonRefundAccom').addEventListener('change', function () {
            const supplierAccomField = document.getElementById('supplierAccomSection');
            supplierAccomField.innerHTML = "";
            supplierAccomField.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="accomSupplier">Select the supplier:</label>
                <select class="form-control" id="accomSupplier" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="GDS Hotel">GDS Hotel</option>
                    <option value="AVH">AVH - Amadeus Value Hotels</option>
                    <option value="Expedia TAAP">Expedia TAAP</option>
                    <option value="Expedia EAN">Expedia EAN</option>
                    <option value="Booking.com via Amadeus">Booking.com via Amadeus</option>
                    <option value="Booking.com via Atriis">Booking.com via Atriis</option>
                    <option value="Hotel Website">Hotel Website</option>
                </select>
            </div>
            `;

            document.getElementById('accomSupplier').addEventListener('change', landRefundData)
        });



    };

    const carHireAndTaxiRefund = () => {
        const reasonForCarAndTaxiRefundField = document.getElementById('reasonForCarAndTaxiRefundSection');
        reasonForCarAndTaxiRefundField.innerHTML = "";
        reasonForCarAndTaxiRefundField.innerHTML = `
            <div class="pt-3">
            <label class="form-group" for="reasonRefundCarAndTaxi">Reason for Refund:</label>
                <select class="form-control" id="reasonRefundCarAndTaxi" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Client's request - Change of plans">Client's request - Change of plans</option>
                    <option value="Incorrectly booked - Agent error">Incorrectly booked - Agent error</option>
                    <option value="Incorrectly booked - Client error">Incorrectly booked - Client error</option>
                    <option value="Official government travel advice">Official government travel advice</option>
                    <option value="Supplier issue">Supplier issue</option>
                </select>
            </div>
        `;

        document.getElementById('reasonRefundCarAndTaxi').addEventListener('change', function () {
            const supplierCarAndTaxiField = document.getElementById('supplierCarTaxiSection');
            supplierCarAndTaxiField.innerHTML = "";
            supplierCarAndTaxiField.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="carAndTaxiSupplier">Select the supplier:</label>
                <select class="form-control" id="carAndTaxiSupplier" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Avis">Avis</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Europcar">Europcar</option>
                    <option value="Hertz">Hertz</option>
                    <option value="Sixt">Sixt</option>
                    <option value="Blacklane">Blacklane</option>
                    <option value="Transferz">Transferz</option>
                    <option value="Jyrney">Jyrney</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            `;

            document.getElementById('carAndTaxiSupplier').addEventListener('change', function () {
                if (this.value === 'Other') {
                    // If "Other" is selected, insert an input field for the provider's name
                    const otherProviderInput = document.createElement('div');
                    otherProviderInput.innerHTML = `
                        <div class="pt-3">
                            <label class="form-group" for="otherProviderName">Please enter the provider's name:</label>
                            <input type="text" id="otherProviderName" class="form-control" placeholder="Provider's name" required>
                        </div>
                    `;
                    supplierCarAndTaxiField.appendChild(otherProviderInput);
                    document.getElementById('otherProviderName').focus();

                    // Add a 'blur' event listener to call landRefundData() when the user exits the input field
                    document.getElementById('otherProviderName').addEventListener('blur', function () {
                        if (this.value.trim() !== '') {
                            landRefundData(); // Call this function after the provider's name is entered
                        }
                    });
                } else {
                    // Handle the selection of predefined suppliers
                    landRefundData(); // Proceed if "Other" is not selected
                }
            });
        });
    };


    const railRefund = () => {
        railSection = document.getElementById('railSection')
        railSection.innerHTML = ""
        railSection.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="railQuestion">Is this a Domestic or International Rail Refund?</label>
                    <select class="form-control" id="railQuestion" required>
                        <option value="" selected disabled>Please Select</option>
                        <option value="Domestic Rail Refund">Domestic Rail Refund</option>
                        <option value="International Rail Refund">International Rail Refund</option>
                    </select>
            </div>`;
    };

    const ancillaryRefund = () => {
        const ancillaryReasonforRefundField = document.getElementById('ancillaryReasonforRefundSection');
        ancillaryReasonforRefundField.innerHTML = "";
        ancillaryReasonforRefundField.innerHTML = `
            <div class="pt-3">
            <label class="form-group" for="ancillaryReasonforRefund">Reason for Refund:</label>
                <select class="form-control" id="ancillaryReasonforRefund" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Client's request - Change of plans">Client's request - Change of plans</option>
                    <option value="Incorrectly booked - Agent error">Incorrectly booked - Agent error</option>
                    <option value="Incorrectly booked - Client error">Incorrectly booked - Client error</option>
                    <option value="Official government travel advice">Official government travel advice</option>
                    <option value="Supplier issue">Supplier issue</option>
                </select>
            </div>
        `;

        document.getElementById('ancillaryReasonforRefund').addEventListener('change', function () {
            const ancillarySupplierField = document.getElementById('supplierAncSection');
            ancillarySupplierField.innerHTML = "";
            ancillarySupplierField.innerHTML = `
            <div class="pt-3">
                <label class="form-group" for="ancillarySupplier">Select the supplier:</label>
                <input type="text" id="ancillarySupplier" class="form-control" placeholder="Provider's name" required>
            </div>
            `;

            // Add a 'blur' event listener to the supplier input field
            document.getElementById('ancillarySupplier').addEventListener('blur', function () {
                // Call landRefundData() when the input field loses focus
                landRefundData();
            });

        });
    };

    function landRefundData() {
        landRefundDataSection.innerHTML = "";

        const numberOfPeopleRefund = document.getElementById('numberOfPeopleRefund').value;
        let nameAndRefSectionHTML = '';
        for (let i = 0; i < numberOfPeopleRefund; i++) {
            nameAndRefSectionHTML += `
                <div id="referenceSection${i + 1}" class="pt-3">
                    <label class="form-group" for="nameAccom${i + 1}">Enter ${i + 1}'s traveller name</label>
                    <input class="form-control pt-1" type="text" id="nameAccom${i + 1}" placeholder="Name of traveller ${i + 1}" required>
                </div>
            `;
        }

        const otherLandInputsHTML = `
            <div class="pt-3">
                <label class="form-group" for="reference">Supplier Reference:</label>
                <input class="form-control" type="text" id="reference" placeholder="Enter the supplier reference" required>
            </div>
            <div class="pt-3">
                <label class="form-group" for="localCurrenyRefundAmount">Local currency refund amount if applicable:</label>
                <input class="form-control" type="text" id="localCurrenyRefundAmount" placeholder="Enter if known.">
            </div>
            <div class="pt-3">
                <label class="form-group" for="refundAmountGBP">Refund amount due to EA in GBP</label>
                <input class="form-control" type="text" id="refundAmountGBP" placeholder="Enter the amount we will be receiving in GBP." required>
            </div>
            <div class="pt-3">
                    <label class="form-group" for="orginalFormOfPayment">Select the orignal form of payment</label>
                    <select class="form-control" id="orginalFormOfPayment" required>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Amex">Amex</option>
                    <option value="Master Card">Master Card</option>
                    <option value="Conferma">Conferma</option>
                    <option value="On Account">On Account</option>
                </select>
            </div>
            <div class="pt-4">
                <label class="form-group">Is the refund going back to the client?</label>
                <div>
                    <input type="radio" id="refundBackToClientYes" name="refundBackToClient" value="Yes" required>
                    <label for="refundBackToClientYes">Yes</label>
                    <input type="radio" id="refundBackToClientNo" name="refundBackToClient" value="No" required>
                    <label for="refundBackToClientNo">No</label>
                </div>
            </div>
            <div class="pt-3">
                <label class="form-group">Does your markup need to be refunded?</label>
                <div>
                    <input type="radio" id="markUpBackToClientYes" name="markUpBackToClient" value="Yes" required>
                    <label for="markUpBackToClientYes">Yes</label>
                    <input type="radio" id="markUpBackToClientNo" name="markUpBackToClient" value="No" required>
                    <label for="markUpBackToClientNo">No</label>
                </div>
            </div>
            <div class="pt-3">
                <label class="form-group" for="airNeedToKnow">Is there anything else we need to know?</label>
                <textarea class="form-control" name="airNeedToKnow" id="airNeedToKnow" cols="80" rows="10" placeholder="Please provide as much information as possible."></textarea>
            </div>
            <div class="row justify-content-between pt-3">
                <div class="col-2">
                    <input type="submit" class="btn btn-success btn-lg" value="Submit">
                </div>
                <div class="col-2">
                    <input type="reset" id="resetButton" class="btn btn-danger btn-lg" value="Reset">
                </div>
            </div>
        `;
        landRefundDataSection.innerHTML = nameAndRefSectionHTML + otherLandInputsHTML;
    };
};

// document.addEventListener('DOMContentLoaded', () => {
//     let refundBackToClient = null;
//     let markUpBackToClient = null;

//     // Listener for refund back to client selection
//     document.querySelectorAll('input[name="refundBackToClient"]').forEach((elem) => {
//         elem.addEventListener('change', function () {
//             refundBackToClient = this.value;
//             console.log('Refund back to client:', refundBackToClient); // For debugging
//         });
//     });

//     // Listener for markup back to client selection
//     document.querySelectorAll('input[name="markUpBackToClient"]').forEach((elem) => {
//         elem.addEventListener('change', function () {
//             markUpBackToClient = this.value;
//             console.log('Markup back to client:', markUpBackToClient); // For debugging
//         });
//     });
// });


function clearFlightSections() {
    // Clear all sections related to flights
    const airRefundField = document.getElementById('airRefundTypeSection');
    airRefundField.innerHTML = '';

    const airReasonForVoidSection = document.getElementById('airReasonForVoidSection');
    airReasonForVoidSection.innerHTML = '';

    const airReasonForRefundSection = document.getElementById('airReasonForRefundSection');
    airReasonForRefundSection.innerHTML = '';

    const flightNDCSection = document.getElementById('flightNDCSection');
    flightNDCSection.innerHTML = '';

    const processedAutomaticallySection = document.getElementById('processedAutomaticallySection');
    processedAutomaticallySection.innerHTML = '';

    const bookingSystemSection = document.getElementById('bookingSystemSection');
    bookingSystemSection.innerHTML = '';

    const ndcRefSection = document.getElementById('ndcSupplierRefSection');
    ndcRefSection.innerHTML = '';

    const airSupplierSectionSelect = document.getElementById('airSupplierSection');
    airSupplierSectionSelect.innerHTML = '';

    const airSupplierInput = document.getElementById('airSupplierRef');
    airSupplierInput.innerHTML = '';

    const airRefundData = document.getElementById('airRefundData');
    airRefundData.innerHTML = '';
}
