import { useState } from 'react'
import AdminLogin from './components/admin/AdminLogin'
import AdminHome from './components/admin/AdminHome'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserLogin from './components/users/UserLogin'
import UserHome from './components/users/UserHome'
import AdminAddPackage from './components/admin/AdminAddPackage'
import AdminAddCatogries from './components/admin/AdminAddCatogries'
import AdminAddCustomers from './components/admin/AdminAddCustomers'
import AdminAddParnter from './components/admin/AdminAddParnter'
import BranchDeatils from './components/admin/BranchDeatils'
import ParnteRegesterPage from './components/admin/ParnteRegesterPage'
import DiscountEntry from './components/admin/DiscountEntry'
import DeclarationConfirmation from './components/admin/DeclarationConfirmation'
import VendorSubmission from './components/admin/VendorSubmission'
import Ventors from './components/ventors/Ventors'
import AddBranch from './components/ventors/AddBranch'
import AddBranchForm from './components/ventors/AddBranchForm'
import VentorProfile from './components/ventors/VentorProfile'
import UserProfile from './components/users/UserProfile'
import MorePartners from './components/users/MorePartners'
import VentorBranchDetails from './components/ventors/VentorBranchDetails'
import AdminGraph from './components/admin/AdminGraph'
import VendorAdd from './components/ventors/VendorAdd'
import VendorProfileRight from './components/ventors/VendorProfileRight'
import AdminAds from './components/admin/AdminAds'
import AdminNotification from './components/admin/AdminNotification'
import AllNotification from './components/admin/AllNotification'
import NewRegistration from './components/admin/NewRegistration'
import ChangesinOffer from './components/admin/ChangesinOffer'
import VendorRegister from './components/ventors/VendorRegister'
import VendorRegisterationForm from './components/ventors/VendorRegisterationForm'
import VendorDiscountEntry from './components/ventors/VendorDiscountEntry'
import VendorDeclaration from './components/ventors/VendorDeclaration'
import VendorEmailSubmission from './components/ventors/VendorEmailSubmission'
import ProtectedRoute from './components/RouteProtectors/AuthProtector'
import { useSelector } from 'react-redux'
import UsersNotification from './components/users/UsersNotification'
import Pricing from './components/users/Pricing'
import UserRegiterationPage from './components/users/UserRegiterationPage'
import UserPartners from './components/users/UserPartners'
import VendorNotifications from './components/ventors/VendorNotifications'
import DiscountEntry1 from './components/admin/DiscountEntry1'
import ViewBranch from './components/ventors/ViewBranch'
import Account_Verify from './components/users/Account_verify'
import Forgot_Page from './components/users/Forgot_Page'
import Reset_Password from './components/users/Reset_Password'
import InnerDiscountEntryVendor from './components/ventors/InnerDiscountEntryVendor'
function App() {
  const [count, setCount] = useState(0)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const AuthType = useSelector(state => state.auth.user);

  const isAdminAuthenticated = useSelector(state => state.adminAuth.isAdminAuthenticated);
  const adminUser = useSelector(state => state.adminAuth.adminUser);

  const isVendorAuthenticated = useSelector(state => state.vendorAuth.isVendoAuthenticated);
  const vendor = useSelector(state => state.vendorAuth.vendor);

  return (
    <>
      <Routes>
        <Route path="/verify_account" element={<Account_Verify />} />
        <Route path="/forgot" element={<Forgot_Page />} />
        <Route path="/reset_password" element={<Reset_Password />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-register" element={<UserRegiterationPage />} />
        <Route path="/admin-home" element={isAdminAuthenticated && adminUser?.type === 'admin' ? (<AdminHome />) : (<Navigate to="/login" replace />)}>
          <Route path="" element={<AdminGraph />} />
            <Route path="add-package" element={<AdminAddPackage />} />
          <Route path="add-Catogries" element={<AdminAddCatogries />} />
          <Route path="add-Customers" element={<AdminAddCustomers />} />
          <Route path="add-Ads" element={<AdminAds />} />
          <Route path="Notification" element={<AdminNotification />} >
            <Route path="" element={<AllNotification />} />
            <Route path="NewRegistration" element={<NewRegistration />} />
            <Route path="ChangesinOffer" element={<ChangesinOffer />} />
          </Route>
          <Route path="add-Parnter" element={<AdminAddParnter />} >
            <Route path="" element={<ParnteRegesterPage />} />
            <Route path="branch-details/:id" element={<BranchDeatils />} />
            <Route path="Discount-Entry/:id" element={<DiscountEntry1 />} />
            <Route path="Declaration-Confirmation/:id" element={<DeclarationConfirmation />} />
            <Route path="Vendor-Submission/:id" element={<VendorSubmission />} />
          </Route>
        </Route>
        <Route path="/" element={isAuthenticated && AuthType.type === 'user' ? (<UserHome />) : (<Navigate to="/login" replace />)} >
          <Route path="" element={<UserProfile />} />
          <Route path="Partners" element={<UserPartners />} />
          <Route path="MorePartners/:id" element={<MorePartners />} />
          <Route path="Users-Notification" element={<UsersNotification />} />
          <Route path="Pricing" element={<Pricing />} />
        </Route>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/Vendor-register" element={<VendorRegister />} >
          <Route path="" element={<VendorRegisterationForm />} />
          <Route path="Discount-Entry/:id" element={<VendorDiscountEntry />} />
          <Route path="Vendor-Declaration/:id" element={<VendorDeclaration />} />
          <Route path="Vendor-EmailSubmission/:id" element={<VendorEmailSubmission />} />
        </Route>
        <Route path="/vendors" element={isVendorAuthenticated && vendor?.type === 'vendor' ? (<Ventors />) : (<Navigate to="/login" replace />)}>
          <Route path="" element={<VentorProfile />} >
            <Route path="" element={<VendorProfileRight />} />
            <Route path="Vendor-Ad" element={<VendorAdd />} />
            <Route path="Vendor-Notifications" element={<VendorNotifications />} />
          </Route>
          <Route path="add-Branch" element={<AddBranch />} >
            <Route path="" element={<AddBranchForm />} />
            <Route path="Discount-Entry/:id" element={<InnerDiscountEntryVendor />} />
            <Route path="Ventor-BranchDetails" element={<VentorBranchDetails />} />
          </Route>
          <Route path="View-Branch/:id" element={<ViewBranch />} >
          </Route>
        </Route>
      </Routes>
      <div>
        <h1 className='text-red-800'>Helloooo</h1>
      </div>
    </>
  )
}

export default App
