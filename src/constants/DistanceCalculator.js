const asin = Math.asin
const cos = Math.cos
const sin = Math.sin
const sqrt = Math.sqrt
const PI = Math.PI

const R = 6378137

function squared(x) { return x * x }
function toRad(x) { return x * PI / 180.0 }
function hav(x) {
    return squared(sin(x / 2))
}

export const calculateDistance = (userLat, userLon, targetLat, targetLon) => {
    const aLat = toRad(userLat);
    const bLat = toRad(targetLat);
    const aLng = toRad(userLon);
    const bLng = toRad(targetLon);

    const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
    const distance = 2 * R * asin(sqrt(ht));
    // console.log({
    //     userLat, userLon, targetLat, targetLon, distance
    // })
    return distance;
}