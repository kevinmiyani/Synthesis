export const convertUpcEtoUpcA = (upcE) => {
    if (upcE.length !== 8) {
        return null; // Ensure the input is exactly 8 digits (including NSD and check digit)
    }

    // Extract digits from UPC-E
    const nsd = upcE[0]; // Number System Digit
    const e1 = upcE[1];
    const e2 = upcE[2];
    const e3 = upcE[3];
    const e4 = upcE[4];
    const e5 = upcE[5];
    const e6 = upcE[6]; // Sixth digit determines the expansion pattern
    const checkDigit = upcE[7];

    let manufacturerCode, productCode;

    switch (e6) {
        case '0':
        case '1':
        case '2':
            // Manufacturer code: E1 E2 E6
            // Product code: 0000 E3 E4 E5
            manufacturerCode = `${e1}${e2}${e6}`;
            productCode = `0000${e3}${e4}${e5}`;
            break;
        case '3':
            // Manufacturer code: E1 E2 E3
            // Product code: 00000 E4 E5
            manufacturerCode = `${e1}${e2}${e3}`;
            productCode = `00000${e4}${e5}`;
            break;
        case '4':
            // Manufacturer code: E1 E2 E3 E4
            // Product code: 00000 0 E5
            manufacturerCode = `${e1}${e2}${e3}${e4}`;
            productCode = `00000${e5}`;
            break;
        default: // '5' to '9'
            // Manufacturer code: E1 E2 E3 E4 E5
            // Product code: 0000 E6
            manufacturerCode = `${e1}${e2}${e3}${e4}${e5}`;
            productCode = `0000${e6}`;
            break;
    }

    const upcA = `${nsd}${manufacturerCode}${productCode}${checkDigit}`;

    // Return the UPC-A code
    return upcA;
};