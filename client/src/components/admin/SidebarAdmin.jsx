
import CategoryListContent from '../common/CategoryListContent';

function SidebarAdmin() {
    return (
        <div className="w-56 bg-bg-secondary font-cabin min-h-screen overflow-y-scroll no-scrollbar max-md:hidden fixed h-full transition-colors ease-linear duration-300">
            <CategoryListContent />
        </div>
    );
}

export default SidebarAdmin;
