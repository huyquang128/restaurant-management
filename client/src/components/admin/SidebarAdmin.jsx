import CategoryListContent from '../common/CategoryListContent';

function SidebarAdmin() {
    return (
        <div
            className="rounded-lg pb-10 w-60 bg-bg-secondary font-cabin max-md:hidden 
                        fixed min-h-screen transition-all ease-linear duration-300 
                        hover:shadow-header-shadow overflow-y-scroll no-scrollbar h-full"
        >
            <CategoryListContent closeModal="null" />
        </div>
    );
}

export default SidebarAdmin;
