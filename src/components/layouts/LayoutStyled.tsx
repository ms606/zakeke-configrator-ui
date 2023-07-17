import { EditTextItem } from '../widgets/ItemText';
import { EditImageItem } from '../widgets/ItemImage';
import { DialogWindow } from '../dialog/Dialogs';
import styled from 'styled-components/macro';
import { Icon } from '../Atomic';

export const GroupItem = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
height: 100px;
width: 100px;
margin-bottom: 20px;
text-align: center;
cursor: pointer;
padding: 0px 10px 0px 10px;

&:hover {
    background-color: white;
}

&.selected {
    background-color: white;
}

span {
    font-size: 12px;
}

@media (max-width: 1025px) {
    min-width: 90px;
    padding-right: 5px;
}

@media (max-width: 1024px) {
    min-width: 110px;
    margin-bottom: 0;
    margin-right: 10px;
}
@media (max-width: 42px) {
    min-width: 100px;
}
`;

export const GroupIcon = styled.img`
width: 100%;
height: 40px;
object-fit: contain;
margin-bottom: 10px;
`;


export const TemplatesContainer = styled.div`
	display: flex;
	flex-direction: row;
	grid-gap: 5px;
	align-items: flex-start;
	margin-bottom: 40px;
	overflow: hidden;
	min-height: 0;
`;

export const Template = styled.div<{ selected?: boolean }>`
	padding: 10px;
	cursor: pointer;

	&:hover {
		background-color: #f4f4f4;
	}

	${(props) =>
		props.selected &&
		`
       background-color: #f4f4f4;
    `}
`;


export const SelectContainer = styled.div`
	margin-bottom: 30px;
	padding-bottom: 30px;
	border-bottom: 1px #ccc dotted;
	position: relative;

	span {
		margin-bottom: 10px;
		font-size: 16px;
		display: block;
	}
`;

export const Center = styled.div`
	text-align: center;
	font-size: 18px;
	padding: 30px;
`;

export const CustomQuotationConfirmMessage = styled(DialogWindow)`
	display: flex;
	align-items: center;
	justify-content: center;
`;


export const ZoomInIcon = styled(Icon)`
	position: absolute;
	left: 20px;
	top: calc(30%);
	width: 32px;
	height: 32px;
	z-index: 3;
`;

export const ZoomOutIcon = styled(Icon)`
	position: absolute;
	left: 20px;
	top: calc(30% + 50px);
	width: 32px;
	height: 32px;
	z-index: 3;
`;


export const SupportedFormatsList = styled.span`
	font-size: 16px;
	font-style: italic;
	text-align: center;
	color: #313c46;
	padding-top: 5px;
`;

export const ZakekeDesignerContainer = styled.div<{ isMobile?: boolean }>`
	height: 100%;
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	background: #ffffff;
	${(props) =>
		props.isMobile &&
		`
       position:fixed;
        inset:0;
        z-index:13;
    `}
`;

export const IconsAndDesignerContainer = styled.div`
	position: absolute;
	left: 0;
	top: calc(50% - 30px);
	z-index: 2;
	display: flex;
	flex-direction: column;
`;