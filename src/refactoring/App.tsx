import { useState } from 'react';
import { AdminPage } from './pages/AdminPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import Title from './components/atoms/Title.tsx';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Title level={1} text={'쇼핑몰 관리 시스템'} topTitle={true} />
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
            {isAdmin ? '장바구니 페이지로' : '관리자 페이지로'}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">{isAdmin ? <AdminPage /> : <CartPage />}</main>
    </div>
  );
};

export default App;
