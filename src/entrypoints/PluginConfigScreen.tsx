import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextField } from 'datocms-react-ui';
import { useState } from 'react';

export const PluginConfigScreen = ({ ctx }: { ctx: RenderConfigScreenCtx }) => {
	const [values, setValues] = useState<
		{
			key: string;
			value: string;
		}[]
	>(() => {
		if (!ctx.plugin.attributes.parameters) return [];
		const keys = Object.keys(ctx.plugin.attributes.parameters);
		return keys.map(key => {
			return {
				key,
				value: (ctx.plugin.attributes.parameters[key] as string) || '',
			};
		});
	});

	const handleAddItem = () => {
		if (values.filter(value => !value.key || !value.value).length > 0) return;
		const items = Array.from(values);

		items.push({
			key: '',
			value: '',
		});

		setValues(items);
	};

	return (
		<Canvas ctx={ctx}>
			<div className='container'>
				<h3>Global values</h3>
				<div className='list'>
					{values.map((value, index) => (
						<div className='item' key={index}>
							<div className='field'>
								<TextField
									id={`key-${index}`}
									name={`key-${index}`}
									label='Key'
									onChange={value => {
										const items = Array.from(values);
										items[index].key = value;
										setValues(items);
									}}
									value={value.key}
								/>
							</div>

							<div className='field'>
								<TextField
									id={`value-${index}`}
									name={`value-${index}`}
									label='Value'
									onChange={value => {
										const items = Array.from(values);
										items[index].value = value;
										setValues(items);
									}}
									value={value.value}
								/>
							</div>
						</div>
					))}
				</div>
				<div className='buttonRow'>
					<Button
						leftIcon={
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='1em' height='1em'>
								<path d='M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z'></path>
							</svg>
						}
						buttonType='muted'
						onClick={handleAddItem}
					>
						Add value
					</Button>
					<Button
						buttonType='primary'
						onClick={() => {
							ctx.updatePluginParameters(
								values.reduce(
									(acc, value) => {
										acc[value.key] = value.value;
										return acc;
									},
									{} as Record<string, string>
								)
							);
							ctx.notice('Global settings updated successfully!');
						}}
					>
						Save
					</Button>
				</div>
			</div>
		</Canvas>
	);
};
