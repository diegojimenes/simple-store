import './cart.css'
import { CheckOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Space, Image, Col, Button, InputNumber } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { CartSliceI, saveCart } from '../../Redux/Reducers/CartReducer';

const { Column } = Table;

export const Cart = () => {
    const cart = useSelector((state: CartSliceI) => state.CartSlice.cart)
    const [modal, contextHolder] = Modal.useModal()
    const dispatch = useDispatch()

    const removeFromCart = (key: number) => {
        let cartParse = JSON.parse(cart)
        const newCart = cartParse.filter((item: any) => {
            return item.key !== key
        })
        dispatch(saveCart(JSON.stringify(newCart)))
        localStorage.setItem('myCart', JSON.stringify(newCart))
    }
    
    const changeAmount = (key: number, amount: number) => {
        let cartParse = JSON.parse(cart)
        const newCart = cartParse.reduce((newObj: any, item: any) => {
            if (item.key === key) {
                return [...newObj, { ...item, amount: amount }]
            } else {
                return [...newObj, item]
            }
        }, [])
        dispatch(saveCart(JSON.stringify(newCart)))
        localStorage.setItem('myCart', JSON.stringify(newCart))
    }

    const confirm = (call: Function) => {
        modal.confirm({
            title: 'Remove product',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to remove this product?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => call(),
            onCancel: () => {}
        });
    }

    return <Col span={20} offset={2}>
        <div style={{ paddingLeft: 15, paddingRight: 35 }}>
            <h1 style={{ paddingTop: 20, paddingBottom: 20 }}>My Cart</h1>
            <Table dataSource={JSON.parse(cart)} pagination={{ hideOnSinglePage: true, pageSize: 10 }}>
                <Column title="image" dataIndex="image" key="image" render={(text) => (
                    <Space size="middle">
                        <Image
                            width={100}
                            src={text}
                        />
                    </Space>
                )} />
                <Column title="name" dataIndex="name" key="name" />
                <Column title="amount" dataIndex="amount" key="amount" render={(text, record: any) => (
                    <Space size="middle">
                        <InputNumber min={1} max={record.stock} defaultValue={text} onChange={(a) => changeAmount(record.key, a)} />
                    </Space>
                )} />
                <Column title="price" dataIndex="price" key="price" render={(text) => (
                    <Space size="middle">
                        {parseFloat(text).toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}
                    </Space>
                )} />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record: any) => (
                        <Space size="middle">
                            <Button icon={<DeleteOutlined />} size={'large'} onClick={() => {
                                confirm(() => removeFromCart(record.key))
                            }} />
                        </Space>
                    )}
                />
            </Table>
            <div className="checkout-cart">
                <div>
                    <h2>Sub Total</h2>
                    <h3>
                        {JSON.parse(cart).reduce((total: any, { price, amount }: any) => {
                            return total + (parseFloat(price) * amount)
                        }, 0).toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}
                    </h3>
                </div>
                <div>
                    <Button icon={<CheckOutlined />} size={'large'}>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
        {contextHolder}
    </Col>
}