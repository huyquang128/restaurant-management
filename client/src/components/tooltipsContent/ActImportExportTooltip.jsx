import Button from '../common/Button/Button';
import import_white from '@/assets/icon/import_white.svg';
import export_white from '@/assets/icon/export_white.svg';

function ActImportExportTooltip() {
    return (
        <div className="flex gap-2 text-sm">
            <Button
                icon={import_white}
                title="Import"
                bg="green"
                text_color="white"
                bg_border="green"
            />
            <Button
                icon={export_white}
                title="Export"
                bg="green"
                text_color="white"
                bg_border="green"
            />
        </div>
    );
}

export default ActImportExportTooltip;
