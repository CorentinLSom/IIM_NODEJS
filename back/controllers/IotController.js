let Iot = "Gryffindor"

const getIot = async (req, res) => {
    return res.json({ Iot: Iot });
}

const house = async (req, res) => {
    Iot = req.body.Iot;
    return res.json({ Iot: Iot });
}

export { getIot, house};