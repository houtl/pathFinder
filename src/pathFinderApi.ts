import express, { Request, Response } from 'express';
import { validate } from './validate';
import { getBestRoad } from './getBestRoad';
import { Input } from './types/input';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/find-path', (req: Request, res: Response) => {
    const input: Input = req.body;

    if (!validate(input)) {
        return res.status(400).json({
            error: 'Invalid input data',
            details: validate.errors
        });
    }

    const path = getBestRoad(input);

    return res.json({
        path: path || null
    });
});

app.listen(PORT, () => {
    console.log(`Path Finder API is running on http://localhost:${PORT}`);
});