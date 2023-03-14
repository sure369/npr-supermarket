import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import Grocery from "./components/Grocery";
import GroceryDetailPage from "./components/recordDetailpage/GroceryDetailPage";
import BillPreview from "./components/Bill";
import ChildCompoent from "./components/useContext/ChildCompoent";
import ParentComponent from "./components/useContext/ParentComponent";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<ParentComponent />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/bill" element={<BillPreview />} />
          <Route path="/new-grocery" element={<GroceryDetailPage/>}/>
          <Route path="groceryDetailPage/:id" element={<GroceryDetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
