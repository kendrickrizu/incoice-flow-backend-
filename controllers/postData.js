import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export default async function postData(req, res, dataPath) {

    if (!req.body) return

    const invoicePath = join(dataPath, 'invoicesData.json')
    const clients = JSON.parse (await readFile( join(dataPath, 'clientsData.json'), 'utf-8') )
    const invoices = JSON.parse( await readFile( invoicePath, 'utf-8') )

    try {

        switch (req.params.data.toLowerCase()) {
            
            case 'clients':
                console.log(clients)
                res.status(200).json({ success: true, message: "client added" })
                return

            case 'invoices':
                const isClientPresent = clients.some(client => client.nametoLowerCase() === req.body.client.toLowerCase())
                if (!isClientPresent) {
                    res.status(400).json({ success: false, message: `INV-${req.body.id} can't be created because ${req.body.client} does not exist. Add the Client in the Clients page before creating invoice.` })
                    return
                }
                invoices.unshift(req.body)
                await writeFile(invoicePath, JSON.stringify(invoices, null, 2))
                res.status(201).json({ success: true, message: `INV-${req.body.id} added` })
                return

            default:
                res.status(404).json({success: false, message: 'NOT ADDED'})
                return
        }

    } catch (error) {

        console.error(error)
    }

}
