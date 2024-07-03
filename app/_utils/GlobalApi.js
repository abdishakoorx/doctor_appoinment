import { gql, request } from 'graphql-request'

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const GetCategory = async () => {
    const query = gql`
      query Categories{
        categories {
            id
            slug
            name
            icon {
              url
            }
          }
      }
    `
    
    const result = await request(MASTER_URL, query);
    return result;
};

const GetDoctors = async () => {
  const query = gql`
  query Doctors {
    doctors(first: 50) {
      category {
        name
      }
      about
      address {
        latitude
        longitude
      }
      email
      endTime
      experience
      id
      name
      icon {
        url
      }
      phone
      premium
      startTime
      location
    }
  }`
  
  const result = await request(MASTER_URL, query);
  return result;
};



const GetDoctorsByCategory = async (categoryName) => {
  const query = gql`
  query DoctorsByCategory($categoryName: String!) {
    doctors(where: {category: {name: $categoryName}}, first: 50) {
      id
      name
      about
      address {
        latitude
        longitude
      }
      email
      endTime
      experience
      icon {
        url
      }
      phone
      premium
      startTime
      location
    }
  }`
 
  const variables = {
    categoryName: categoryName
  };

  const result = await request(MASTER_URL, query, variables);
  return result;
};

const GetDoctorById = async (id) => {
  const query = gql`
  query DoctorById($id: ID!) {
    doctor(where: {id: $id}) {
      id
      name
      about
      category {
        name
      }
      address {
        latitude
        longitude
      }
      email
      endTime
      experience
      icon {
        url
      }
      phone
      premium
      startTime
      location
    }
  }`
 
  const variables = {
    id: id
  };
  const result = await request(MASTER_URL, query, variables);
  return result;
};




const CreateAppointment = async (data) => {
  const query = gql`
  mutation createAppointment($userName: String!, $date: String!, $email: String!, $note: String, $time: String!, $doctorId: ID!) {
    createAppointment(data: {
      userName: $userName,
      date: $date,
      email: $email,
      note: $note,
      time: $time,
      doctors: {connect: {id: $doctorId}}
    }) {
      id
    }
    publishManyAppointments(to: PUBLISHED) {
      count
    }
  }`
  
  const variables = {
    userName: data.Username,
    email: data.Email,
    note: data.Note,
    time: data.Time,
    date: data.Date, 
    doctorId: data.Doctors
  };

  const result = await request(MASTER_URL, query, variables);
  return result;
};



const GetAppointments = async (email) => {
  const query = gql`
  query Appointments($email: String!) {
    appointments(first: 100, where: {email: $email}) {
      date
      doctors {
        name
        icon {
          url
        }
        location
      }
      email
      id
      time
      userName
    }
  }`

  const variables = {
    email: email
  };

  const result = await request(MASTER_URL, query, variables);
  return result.appointments;
};


const DeleteAppointment = async (id) => {
  const query = gql`
  mutation DeleteAppointment ($id: ID!) {
    deleteAppointment(where: {id: $id}) {
      id
    }
  }`
  
  const variables = {
    id: id
  };

  const result = await request(MASTER_URL, query, variables);
  return result;
};

export default {
    GetCategory,
    GetDoctors,
    GetDoctorsByCategory,
    GetDoctorById,
    CreateAppointment,
    GetAppointments,
    DeleteAppointment
};