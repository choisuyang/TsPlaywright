import express from 'express';
import cors from 'cors';
import { checkProduct } from './productCheck';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/check-product/:productNo', async (req, res) => {
    const { productNo } = req.params;

    if(!productNo) {
        return res.status(400).json({error : 'productNo is required'});
    }

    try {
        const result = await checkProduct(productNo);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error : 'Internal error'});
    }
})

app.listen(port, () => {
    console.log(`QA 서버가 http://localhost:${port} 에서 실행중....`)
})