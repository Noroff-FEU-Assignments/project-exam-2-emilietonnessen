import { createContext, useContext, useState } from 'react';

 const CategoryContext = createContext();

/* interface CategoryContext {
    children: React.ReactNode;
} */


export const CategoryProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState("explore");

    return (
        <CategoryContext.Provider value={[activeCategory, setActiveCategory]}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContext;

/* export function useAppContext() {
    return useContext(CategoryContext);
};  */

//const CategoryContext = createContext(null);