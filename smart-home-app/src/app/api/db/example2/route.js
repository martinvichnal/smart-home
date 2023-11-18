import sql from "mssql"

export default async function handler(req, res) {
    await sql.connect(
        "Server=localhost;Database=Company_SumKum;User Id=suman;Password=2861070;Encrypt=false;trustServerCertificate:false"
    )
    await sql
        .query(
            `select fname,lname,sex,dno from employee where lname like '%${req.query.q}%'`
        )
        .then((resp) => {
            return res.status(200).send(resp.recordset)
        })
}

//   const [rows, setRows] = useState<IRow[]>([]);
//   const [search, setSearch] = useState("");

//   const fetchResults = () => {
//     axios
//       .get(`http://localhost:3000/api/fetch?q=${search}`)
//       .then((res) => {
//         setRows(res.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

// https://github.com/su-per-man/NextJS-MSSQL-Search/blob/main/pages/index.tsx#L75
