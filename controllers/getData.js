import { readFile } from 'node:fs/promises'
import { join } from 'node:path'


export default async function getData(req, res, dataPath) {
    
    try {

        switch (req.params.data.toLowerCase()) {
            case 'clients':
                const clients = await readFile(join(dataPath, 'clientsData.json'), 'utf-8') 
                res.status(200).json(JSON.parse(clients))
                return
                
            case 'invoices':
                const invoices = await readFile(join(dataPath, 'invoicesData.json'), 'utf-8') 
                res.status(200).json(JSON.parse(invoices))
                return
                
            default:
                res.status(404).json({message: 'NOT FOUND'})
                return
        }
            
    } catch (error) {
        console.error(error)
    }

}
