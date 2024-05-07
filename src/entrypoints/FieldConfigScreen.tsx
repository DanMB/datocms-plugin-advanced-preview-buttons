import type { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, Button, TextField, SelectField } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import s from './styles.module.css';
import { SlugButtonProps } from '../types';

export const FieldConfigScreen = ({ ctx }: { ctx: RenderManualFieldExtensionConfigScreenCtx }): JSX.Element => {
	const [buttonList, setButtonList] = useState<SlugButtonProps[]>(
		(ctx.parameters.buttonList as SlugButtonProps[]) || [
			{
				label: '',
				value: '',
				style: 'muted',
				id: '0',
			},
		]
	);

	const handleOnDragEnd = (result: DropResult) => {
		if (result.reason === 'CANCEL' || !result.destination) return;
		const items = Array.from(buttonList);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setButtonList(items);
	};

	const handleAddItem = () => {
		if (buttonList.filter(button => !button.label || !button.value).length > 0) return;
		const items = Array.from(buttonList);

		items.push({
			label: '',
			value: '',
			style: 'muted',
			id: new Date().getTime().toString(),
		});

		setButtonList(items);
	};

	useEffect(() => {
		const validButtons = buttonList.filter(button => button.label && button.value);
		ctx.setParameters({ buttonList: validButtons });
	}, [buttonList]);

	return (
		<Canvas ctx={ctx}>
			<div className={s.container}>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId='buttonList'>
						{provided => (
							<div className={s.list} {...provided.droppableProps} ref={provided.innerRef}>
								{buttonList.map((button, index) => {
									return (
										<Draggable key={button.id} draggableId={button.id} index={index}>
											{provided => (
												<div
													className={s.item}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<div className={s.handle}>
														<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='1em' height='1em'>
															<path d='M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z'></path>
														</svg>
													</div>
													<div className={`${s.field} ${s.label}`}>
														<TextField
															required={true}
															id={`${button.id}_label`}
															name={`${button.id}_label`}
															onChange={value => {
																const items = Array.from(buttonList);
																items[index].label = value;
																setButtonList(items);
															}}
															label='Label'
															value={button.label}
														/>
													</div>
													<div className={`${s.field} ${s.value}`}>
														<TextField
															required={true}
															id={`${button.id}_value`}
															name={`${button.id}_value`}
															onChange={value => {
																const items = Array.from(buttonList);
																items[index].value = value;
																setButtonList(items);
															}}
															label='Value'
															value={button.value}
														/>
													</div>
													<div className={`${s.field} ${s.style}`}>
														<SelectField
															required={true}
															id={`${button.id}_style`}
															name={`${button.id}_style`}
															label='Style'
															selectInputProps={{
																options: [
																	{ label: 'muted', value: 'muted' },
																	{ label: 'primary', value: 'primary' },
																	{ label: 'negative', value: 'negative' },
																],
																isMulti: false,
															}}
															value={{ label: button.style, value: button.style }}
															onChange={value => {
																if (!value) return;
																const items = Array.from(buttonList);
																items[index].style = value.value;
																setButtonList(items);
															}}
														/>
													</div>
													<Button
														className={s.delete}
														buttonType='muted'
														buttonSize='xxs'
														leftIcon={
															<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='1em' height='1em'>
																<path d='M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z'></path>
															</svg>
														}
														onClick={() => {
															const items = Array.from(buttonList);
															if (items.length <= 1) {
																items[index].label = '';
																items[index].value = '';
																items[index].style = 'muted';
																setButtonList(items);
															} else {
																items.splice(index, 1);
																setButtonList(items);
															}
														}}
													/>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<Button
					leftIcon={
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='1em' height='1em'>
							<path d='M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z'></path>
						</svg>
					}
					buttonType='muted'
					onClick={handleAddItem}
				>
					Add new button
				</Button>
			</div>
		</Canvas>
	);
};
