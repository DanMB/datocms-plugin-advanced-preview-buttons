import { RenderFieldExtensionCtx, RenderManualFieldExtensionConfigScreenCtx, connect } from 'datocms-plugin-sdk';
import { render } from './utils/render';
// import { PluginConfigScreen } from './entrypoints/PluginConfigScreen';
import 'datocms-react-ui/styles.css';
import { FieldConfigScreen } from './entrypoints/FieldConfigScreen';
import { FieldAddon } from './entrypoints/FieldAddon';
import { PluginConfigScreen } from './entrypoints/PluginConfigScreen';

connect({
	manualFieldExtensions() {
		return [
			{
				id: 'SlugPreviewButtons',
				name: 'Slug Preview Buttons',
				type: 'addon',
				fieldTypes: ['slug'],
				configurable: true,
			},
		];
	},
	renderConfigScreen(ctx) {
		return render(<PluginConfigScreen ctx={ctx} />);
	},
	renderFieldExtension(_fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
		render(<FieldAddon ctx={ctx} />);
	},
	renderManualFieldExtensionConfigScreen(_fieldExtensionId: string, ctx: RenderManualFieldExtensionConfigScreenCtx) {
		render(<FieldConfigScreen ctx={ctx} />);
	},
});
