# Synthesis Inventory Companion

## 1. Project Title
**Synthesis Inventory Companion** — built for Westside Market (NYC) store associates to manage inventory, surface product insights, and keep watchlists in sync with a centralized retail service via a secure React Native mobile experience.

## 2. Project Overview
The app authenticates Westside Market personnel, enforces location-based access, and surfaces real-time product intelligence across multiple NYC branches. After login, users can scan UPC/barcodes, compare cross-branch availability, bookmark high-priority items, report issues, and explore best sellers or slow movers. The experience adapts to dual user modes: when the device stays within a store radius (“in-store”) it unlocks full analytics, scanning, and watchlist features, while exiting the permitted radius triggers a remote mode that prompts logout and removes sensitive controls. Target users are retail managers, merchandisers, and field reps who need fast access to inventory analytics, watchlists, scan history, and biometric-secured access while shepherding stock on the sales floor or coordinating remotely. The high-level workflow is:
1. Authenticate with username/password (plus optional biometrics) while capturing location so the app can enforce the Westside Market perimeter policy.
2. Seed store, department, and report-issue metadata so dropdowns stay populated and the local store cache is ready for every chain location.
3. Continuously monitor GPS; compare the device position against each store’s radius and lock the session if the user leaves the allowed area, reflecting the in-store vs. remote duality.
4. Let the user scan items, view product data across stores, add/remove watchlist entries, share snapshots, submit issue reports, and analyze sales performance backed by the remote APIs.

## 3. Tech Stack
### Frontend
- **Framework:** React Native `0.75.3` with the React `18.3.1` core.
- **UI & Navigation:** `@react-navigation/native`, stack navigation, shared elements, and custom components (`FloatingScannerButton`, `DashboardButton`, layered modals).
- **State management:** Redux Toolkit (`configureStore` in `src/redux/Store.js`), AsyncStorage caching, and a Location context provider.
- **Networking:** Axios helpers in `src/api/utils.js` talk to a configurable `DOMAIN` and include bearer tokens for every protected request.
- **Native integrations:** Barcode scanning (`react-native-camera` + `expo-barcode-scanner`), GPS (`react-native-geolocation-service`, `react-native-permissions`), biometrics (`react-native-biometrics`), sharing + view capture (`react-native-share`, `react-native-view-shot`), fast loading images, device info, and Sentry monitoring.


### Tools & Services
- **Sentry:** `@sentry/react-native` is initialized in `src/App.js` for crash tracking.
- **Development tooling:** Yarn 3 (`packageManager`), Babel, Metro, Jest (`__tests__/App.test.tsx`), ESLint, Prettier.
- **Utilities:** `date-fns`, `jsbarcode`, `socket.io-client` (socket helper under `src/api/Socket.js` ready for future real-time pushes).

## 4. Architecture Overview
- **FE ↔ BE interaction:** Axios clients hit `${DOMAIN}/api/...` and attach `Authorization: Bearer <token>` (persisted in Redux/AsyncStorage) to every protected request.
- **REST API structure:** segmented resources cover stores, user metadata, item lists by code/scan, keyword search, watchlist operations, best/slow mover dashboards, and issue reporting.
- **Authentication flow:** `LoginScreen.Hooks.js` posts form-encoded credentials plus latitude/longitude to `HRLogin/GetUserLogProducts`; success populates Redux and AsyncStorage (`AuthId`, `User`, `StoreList`) and may prompt biometric enrollment.
- **Data flow:** Once authenticated, `App.js` refreshes store, department, and issue lists. Screens like Dashboard, Scanner, Watchlist, Best Sellers, Slow Movers, Product, and Search pull data from Redux slices and hit Axios helpers for fresh info.

## 5. Frontend Overview
- **Type:** Standalone, biometric-ready React Native mobile application.
- **Purpose:** Securely empower Westside Market staff to authenticate, enforce in-store access, inspect item performance, manage watchlists, share snapshots, and report inventory issues without leaving the sales floor.

## 6. Frontend Tech Stack
- **React Native ecosystem:** Core RN components, SafeAreaContext, Gesture Handler, Vector Icons, LinearGradient, Fast Image, Toasts.
- **Navigation:** Stack navigator (`src/navigation/NavigationHandler.js`) with potential bottom tab extension (`src/navigation/BottomTab`).
- **State & Side Effects:** Redux Toolkit slices (`src/redux/*`), AsyncStorage helpers (`src/constants/AsyncStorage.js`), `AppState` watchers, Sentry wrapping, and rich modals/toasts.
- **Styling:** Shared styles in `src/constants/styles.js`, responsive helpers, font definitions, palette tokens, and toast configuration.

## 7. Frontend Folder Structure
- `src/api/`: Axios helpers (`utils.js`) and a Socket.IO skeleton (`Socket.js`).
- `src/components/`: Reusable pieces (buttons, modals, table rows, tooltips, image sliders, etc.).
- `src/constants/`: Assets, helper utilities (distance calculator, navigation controller, toast messaging), regular expressions, color palettes, fonts, and responsive helpers.
- `src/context/`: `LocationContext` provider that shares GPS coordinates and permission state across the app.
- `src/navigation/`: Stack navigator plus an unused bottom-tab template.
- `src/redux/`: Auth/user/store/location/department/issue/scan slices with actions and reducers wired to `configureStore`.
- `src/screens/`: Feature screens (login, dashboard, scanner, watchlist, search, product details, best sellers, slow movers, scan history, etc.) each backed by hook-based logic files.
- `src/assets/`: Fonts, icons, placeholder imagery, and `productdata.json` for local search fallbacks.

## 8. Frontend Features
- **Westside Market branding:** location constants seed multiple NYC Westside Market branches so store selection reflects the retail network.
- **Secure login + biometrics:** `LoginScreen` handles username/password + GPS, stores tokens locally, and optionally prompts to enable Touch ID/Face ID for a smooth return flow via `react-native-biometrics`.
- **Location-gated dual mode:** `DashboardScreen` enforces store radius policies with `DistanceCalculator`, showing a countdown modal and automatic logout when staff exit the permitted radius—mirroring separate in-store vs remote states.
- **Barcode scanning + product details:** `ProductScannerScreen` and `ProductScreen` use `getItemByCodeAPI`/`ProductItemLogScanDBDump` responses to display multi-store stats, callouts (coming soon tooltips), watchlist toggles, shareable snapshots (`react-native-view-shot` + `react-native-share`), and issue reporting modalities.
- **Watchlist management:** `WatchlistScreen` loads per-store watchlists via `getItemByStoreIdAPI`, allows removing entries (`RemoveFromWatchlistAPI`), and lets staff drill into each product.
- **Search with offline fallback:** `SearchScreen` conducts weighted local searches against `productdata.json` and only hits `getResponseFromSearch` when local results are missing, keeping UI snappy.
- **Sales analytics:** `BestSellersScreen` and `SlowMoversScreen` each pull department-filtered datasets (`Yesterday`, `Last Week`, `Last Month`) from the backend (`getBestSellersAPI`, `getSlowMoversAPI`).
- **Scan history tracking:** `ScanHistoryScreen` surfaces the last 50 scans plus frequently scanned items (count > 3) for review.
- **Personalized workflows:** Floating scanner shortcuts, option modals (logout, biometrics, update reminders), location selection, and toast/modals smooth user flows.

## 9. Frontend Setup & Installation
### Prerequisites
1. Node.js `>=18`.
2. Yarn `3.6.4` (per `packageManager`).
3. Xcode 15+ for iOS or Android Studio + SDK 34+ for Android.
4. `npx pod-install` for CocoaPods dependencies.

### Environment Configuration
- Set the API host in `src/api/utils.js`: replace `ADD_YOUR_DOMAIN_URL_HERE` with the Westside Market backend domain.
- Optionally swap the Sentry DSN in `src/App.js` if monitoring should point to another project; consider moving these values into a config/`.env` if you need environment separation.

### Installation & Run Steps
1. `yarn install`.
2. `npx pod-install ios` (iOS only).
3. `yarn start` to boot Metro.
4. `yarn android` or `yarn ios` to build and launch on device/emulator.

## 10. Frontend Scripts
- `yarn android` — install and run Android build.
- `yarn ios` — run the iOS app.
- `yarn start` — start Metro bundler.
- `yarn lint` — run ESLint.
- `yarn test` — run Jest (`__tests__/App.test.tsx`).

## 11. Backend Overview
No backend code exists here; the app depends on a REST service owned by Westside Market that provides product, watchlist, and analytics data.

## 12. Backend Tech Stack
- **Runtime/framework:** Not present. The mobile client expects a REST API as described in section 14.
- **Database/ORM:** Not shipped with the client.
- **Authentication/security:** Tokens issued via `HRLogin/GetUserLogProducts` are attached as `Bearer <token>` to all subsequent calls.

## 13. Backend Folder Structure
No backend files are included; all API interactions happen through `src/api/utils.js`.

## 14. API Design
| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/HRLogin/GetUserLogProducts` | Login with username/password + GPS; returns token, user profile, stores, and permissions. |
| `GET` | `/api/GetItemList/GetAllWatchList` | Fetch the current watchlist for a store (`StoreId` query param). |
| `GET` | `/api/GetItemList/GetItemListScanbyCode` | Fetch a product’s full detail used in product/scanner screens. |
| `GET` | `/api/GetItemList/ProductItemLogScanDBDump` | Rich scan log data returned after scanning. |
| `GET` | `/api/GetItemList/GetItembyKeywordSearch` | Keyword search when local search picks up nothing. |
| `GET` | `/api/GetItemList/GetTop50ItemsList` | Best sellers (Yesterday/Last Week/Last Month) per store/department. |
| `GET` | `/api/GetItemList/GetLowest50ItemsList` | Slow movers counterpart. |
| `GET` | `/api/GetItemList/GetAllItemMovementDepartment` | Department filters for analytics screens. |
| `GET` | `/api/GetItemList/GetForceUpdate` | Force/optional update metadata surfaced on the dashboard. |
| `GET` | `/api/GetItemList/GetAllUserDetails` | Meta endpoint syncing user/store permissions after login. |
| `GET` | `/api/GetItemList/GetAllOptionsToReportIssue` | Dropdown options for reporting issues. |
| `POST` | `/api/GetItemList/DeleteApkWatchList` | Remove item from a store watchlist. |
| `POST` | `/api/GetItemList/ApkWatchList` | Add or update watchlist entries with item payloads. |
| `POST` | `/api/GetItemList/ReportIssueDump` | Submit issue reports from the product screen. |

## 15. Authentication & Authorization
- Credentials are posted as form-encoded payloads along with latitude/longitude (`LoginScreen.Hooks.js`).
- Successful login stores the bearer token in AsyncStorage (`AuthId`) and Redux; tokens are valid for eight hours and the app refreshes store/department/issue data whenever auth+user data exist.
- Biometrics (Face ID/Touch ID/Fingerprint) are managed via `react-native-biometrics`, and the dashboard option modal lets users toggle the saved credentials.
- Location permissions (`react-native-permissions`) plus `Geolocation.watchPosition` continuously validate the device against each Westside Market store radius; leaving the radius triggers a countdown modal and automatic logout, enforcing “in-store” vs “remote” boundaries.
- All Axios requests except login include `Authorization: Bearer <token>` headers.

## 16. Backend Setup & Installation
No backend code is included. Point `src/api/utils.js` at a live Westside Market API that implements the endpoints above and honors the authentication contract.

## 17. Database Design
- Local caching: AsyncStorage keys (`AuthId`, `User`, `StoreList`, `ScanHistoryData`, `BiometricsDetails`) mirror the most recent session and recent scans.
- Remote database: handled by the backend; the client treats it as a JSON-serving black box.

## 18. Environment Variables
- `src/api/utils.js` exposes `DOMAIN` (currently `ADD_YOUR_DOMAIN_URL_HERE`). Replace it with the production/staging host.
- Sentry DSN is hard-coded in `src/App.js`; consider externalizing it via config for different environments.
- No other `.env` files are present; introduce them if sensitive data must stay out of the repo.

## 19. Deployment
- **Development:** `yarn start`, then `yarn android` / `yarn ios`.
- **Production:** build via Xcode/Gradle tooling once bundle is configured (`xcodebuild`, `./gradlew assembleRelease`).
- **Updates:** `getAppUpdateVersionAPI` returns `ForceUpdate` flags and URLs that the dashboard opens via `Linking.openURL`.

## 20. Security Considerations
- Geofencing enforces Westside Market policies through `DistanceCalculator`, logging the user out when they stray outside permitted radii.
- Tokens persist for eight hours, cleared during logout (`removeAuthID`, `removeUserDetails`), and scan history is persisted only when the app backgrounds.
- Sentry wraps the root component (`Sentry.wrap(App)`), and toasts surface network/auth issues without leaking secrets.
- Required-field guards exist for login and watchlist flows, while the backend should validate all watchlist/report payloads.

## 21. Future Improvements
1. Implement placeholder screens (Add Items, Manage Stock, Generate PO, Item Movement, Alerts, Predictions).
2. Wire up `src/api/Socket.js` for real-time inventory alerts.
3. Add feature switches or offline refresh strategies for store metadata.
4. Parameterize the Sentry DSN and API domain via `.env` or `react-native-config`.
5. Build end-to-end tests (Detox or similar) covering the scanner/watchlist flows.

## 22. Contribution Guidelines
1. Branch from `main`/`master` per team policy.
2. Name branches descriptively (e.g., `feature/scan-history`).
3. Run `yarn lint` and `yarn test` before pushing; resolve lint/test failures.
4. Document new screens/APIs in this README or a new markdown file.
5. Open a PR with a summary, validation steps (install/run/test), and permissions requested.

## 23. License
No license file exists. Add an appropriate one (MIT, Apache 2.0, etc.) once the project owner decides.
