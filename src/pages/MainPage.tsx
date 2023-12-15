import { Panel, RichTextView, IconContainer, Text, FlexRow } from '@epam/uui';
import { ReactComponent as MainImage } from '../icons/main.svg';
import { FlexCell } from '@epam/uui-components';

export const MainPage = () => {
	return (
		<Panel>
			<FlexRow padding="24">
				<FlexCell width="auto" grow={2}>
					<FlexRow padding="24">
			            <Text fontSize="24" lineHeight="30" color="brand" >
			                Welcome to Artograd!
			            </Text>
			        </FlexRow>
			        <FlexRow padding="24">
			        	<Text fontSize="18" lineHeight="18" color="brand" >
			                The largest community of creators.
			            </Text>
			        </FlexRow>
			        <FlexRow padding="24">
			        	<Text fontSize="18" lineHeight="18" color="brand" >
							Be the one who changes the world around.
			            </Text>
			        </FlexRow>
				</FlexCell>
				<FlexCell width="auto" grow={2}>
					<FlexRow padding="24">
			            <Text fontSize="24" lineHeight="30" color="brand" >
			                How it works:
			            </Text>
			        </FlexRow>
			        <FlexRow/>
					<FlexRow>
			            <Text fontSize="24" lineHeight="30" color="brand" >
			                1.
			            </Text>
			        </FlexRow>
			        <FlexRow>
			        	<Text fontSize="18" lineHeight="18" color="brand" >
			                State officer opens tender for a street art object.
			            </Text>
			        </FlexRow>
			        <FlexRow/>
					<FlexRow padding="24">
			            <Text fontSize="24" lineHeight="30" color="brand" >
			                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
			            </Text>
			        </FlexRow>
			        <FlexRow padding="24">
			        	<Text fontSize="18" lineHeight="18" color="brand" >
			                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creative people submit their ideas and everyone around can vote for the liked ones.
			            </Text>
			        </FlexRow>
			        <FlexRow/>
			        <FlexRow>
			            <Text fontSize="24" lineHeight="30" color="brand" >
			                3.
			            </Text>
			        </FlexRow>
			        <FlexRow>
			        	<Text fontSize="18" lineHeight="18" color="brand" >
			                Investors fund implementation of the winner's idea 
			            </Text>
			        </FlexRow>
			        <FlexRow/>
			        <FlexRow padding="24">
			            <Text fontSize="24" lineHeight="30" color="brand" >
			                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
			            </Text>
			        </FlexRow>
			        <FlexRow padding="24">
			        	<Text fontSize="18" lineHeight="18" color="brand" >
			                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Winner and investors get profit from tourists' and citizens' donations.
			            </Text>
			        </FlexRow>
				</FlexCell>
	        </FlexRow>
        </Panel>
    );
};
/*
export const MainPage = () => {
    return (
        <main>
            <div className={css.bgImg}>
                <IconContainer icon={UuiPromoImage} />
            </div>
            <Panel cx={css.mainPanel}>
                <RichTextView size="14">
                    <h3>Welcome to UUI template app</h3>
                    {
                        links.map((value) => (
                            <p key={value.label}>
                                {value.label}
                                <a href={value.link}>{value.linkLabel}</a>
                            </p>
                        ))
                    }
                </RichTextView>
            </Panel>
        </main>
    );
};*/
