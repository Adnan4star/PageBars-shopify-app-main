import { Button, Frame, Modal } from '@shopify/polaris';
import CircleUpSvg from '../assets/CircleUpIcon.svg';
import { useNavigate } from 'react-router-dom';

function LimitReachedModal({ isModalOpen, onClose }) {
    const navigate = useNavigate();
    return (
        <Modal
            open={isModalOpen}
            onClose={onClose}
            size='small'
            title="Upgrade Plan"
            primaryAction={{
                content: 'See Plans',
                onAction: () => navigate('/BillingPlans'),
            }}
        >
            <Modal.Section>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <img src={CircleUpSvg} alt="circle" className='size-20' />
                    <p>
                        It looks like you've reached your usage capacity with your current plan. To take your business further, you can see which plan is suitable for you by clicking the button below.
                    </p>
                </div>
            </Modal.Section>
        </Modal>
    );
}

export default LimitReachedModal