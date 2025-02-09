import logo from "../assets/image.png";

function Navbar() {
    return (
      <>
  <nav className="bg-blue-900 dark:border-gray-600 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="شعار Medicross" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Medicross</span>
        </a>
        <div id="mega-menu-full" className="items-center justify-between font-medium w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-gray-5 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#" className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:hover:text-blue-300 md:p-0 md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-blue-400 md:dark:hover:bg-transparent dark:border-gray-700">الرئيسية</a>
                </li>
                <li className="relative group">
                  <button className="flex items-center justify-between w-full py-2 px-3 text-white rounded-sm md:w-auto md:hover:bg-transparent md:border-0 md:hover:text-blue-300 md:p-0 md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-blue-400 md:dark:hover:bg-transparent dark:border-gray-700">
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                      </svg>
                    الخدمات
                    
                  </button>
                  {/*  Dropdown Menu */}
              </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:hover:text-blue-300 md:p-0 md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-blue-400 md:dark:hover:bg-transparent dark:border-gray-700">من نحن</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:hover:text-blue-300 md:p-0 md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-blue-400 md:dark:hover:bg-transparent dark:border-gray-700">اتصل بنا</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
      </>
    );
  }
  
  export default Navbar;
  