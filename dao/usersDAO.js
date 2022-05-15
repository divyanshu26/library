let movies
let mfilx 

module.exports = class UsersDAO{
    static async injectDB(conn){
        if(movies){return};

        try{
           // mflix = await conn.db('sample_mflix');
           // movies = await conn.db('sample_mflix').collection('movies');
           databaseList = await conn.db.listCollections();
           console.log('databases:/n');
           //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
           return 'some-data';
        }catch(err){
            console.error(err)
        };
    }
};