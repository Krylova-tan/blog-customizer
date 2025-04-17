import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Select } from 'src/ui/select/Select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useEffect, useState, useRef, SyntheticEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	ArticleStateType,
	fontColors,
	backgroundColors,
	OptionType,
	contentWidthArr,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

interface ArticleParamsFormProps {
	setStateArticle: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setStateArticle } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedStateArticle, setSelectedStateArticle] =
		useState(defaultArticleState);
	const articleParamsFormRef = useRef<HTMLFormElement>(null);

	const handleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedStateArticle({ ...selectedStateArticle, [key]: value });
	};

	const handleSubmitStateArticle = (e: SyntheticEvent) => {
		e.preventDefault();
		setStateArticle(selectedStateArticle);
	};

	const handleResetState = () => {
		setStateArticle(defaultArticleState);
		setSelectedStateArticle(defaultArticleState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				articleParamsFormRef.current &&
				!articleParamsFormRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={articleParamsFormRef}
				style={{ overflowX: 'hidden' }}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmitStateArticle}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						selected={selectedStateArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) =>
							handleChangeSelectedState('fontFamilyOption', options)
						}
						title='Шрифт'
					/>

					<RadioGroup
						name={selectedStateArticle.fontFamilyOption.className}
						options={fontSizeOptions}
						selected={selectedStateArticle.fontSizeOption}
						onChange={(options) =>
							handleChangeSelectedState('fontSizeOption', options)
						}
						title='Размер шрифта'
					/>

					<Select
						selected={selectedStateArticle.fontColor}
						options={fontColors}
						onChange={(options) =>
							handleChangeSelectedState('fontColor', options)
						}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={selectedStateArticle.backgroundColor}
						options={backgroundColors}
						onChange={(options) =>
							handleChangeSelectedState('backgroundColor', options)
						}
						title='Цвет фона'
					/>

					<Select
						selected={selectedStateArticle.contentWidth}
						options={contentWidthArr}
						onChange={(options) =>
							handleChangeSelectedState('contentWidth', options)
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
