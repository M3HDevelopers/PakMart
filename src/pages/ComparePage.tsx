import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Check } from 'lucide-react';
import { products } from '../data/mockData';
import { useStore } from '../store/useStore';

export function ComparePage() {
  const { wishlist } = useStore();
  const [compareIds, setCompareIds] = useState<string[]>(wishlist.slice(0, 4));
  const compareProducts = products.filter(p => compareIds.includes(p.id));

  const removeProduct = (id: string) => {
    setCompareIds(compareIds.filter(pid => pid !== id));
  };

  const specs = ['Brand', 'Category', 'Condition', 'Warranty'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Compare Products</h1>
      {compareProducts.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-500 w-32">Product</th>
                {compareProducts.map(p => (
                  <th key={p.id} className="p-4 min-w-[200px]">
                    <div className="relative">
                      <button onClick={() => removeProduct(p.id)} className="absolute top-0 right-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-200"><X size={12} /></button>
                      <Link to={`/product/${p.slug}`}>
                        <img src={p.images[0]} alt="" className="w-32 h-32 object-cover rounded-lg mx-auto mb-2" />
                      </Link>
                      <Link to={`/product/${p.slug}`} className="text-sm font-medium hover:text-orange-600 line-clamp-2">{p.name}</Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-gray-500">Price</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <p className="font-bold text-orange-600">Rs. {p.price.toLocaleString()}</p>
                    {p.originalPrice > p.price && <p className="text-xs text-gray-400 line-through">Rs. {p.originalPrice.toLocaleString()}</p>}
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-500">Rating</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />)}
                      <span className="text-xs text-gray-500 ml-1">{p.rating.toFixed(1)}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-gray-500">Brand</td>
                {compareProducts.map(p => <td key={p.id} className="p-4 text-center text-sm">{p.brand}</td>)}
              </tr>
              {specs.map(spec => (
                <tr key={spec} className="border-t bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-500">{spec}</td>
                  {compareProducts.map(p => {
                    const value = p.specifications[spec] || '-';
                    const allSame = compareProducts.every(cp => (cp.specifications[spec] || '-') === value);
                    return <td key={p.id} className={`p-4 text-center text-sm ${!allSame ? 'text-orange-600 font-medium' : ''}`}>{value}</td>;
                  })}
                </tr>
              ))}
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-gray-500">Stock</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <span className={`text-sm ${p.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {p.stock > 0 ? `${p.stock} available` : 'Out of stock'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-500">Free Shipping</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    {p.freeShipping ? <Check size={18} className="text-green-500 mx-auto" /> : <span className="text-sm text-gray-400">No</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-gray-500">Seller</td>
                {compareProducts.map(p => <td key={p.id} className="p-4 text-center text-sm">{p.seller}</td>)}
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4"></td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <Link to={`/product/${p.slug}`} className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 inline-block">View Details</Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products to compare</p>
          <p className="text-gray-400 text-sm mt-2">Add products from your wishlist to compare them.</p>
          <Link to="/wishlist" className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 inline-block">Go to Wishlist</Link>
        </div>
      )}
    </div>
  );
}
