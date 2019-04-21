pragma solidity ^0.4.24;

contract Pem4BlockEHR {

    //Exame
    struct Exam {
        string ipfsHash;
    }

    //Paciente
    struct Patient {
        address owner;
        uint countExams;
        mapping(uint => Exam) exams;
    }

    //Professional
    struct Professional {
        address owner;
        uint countPatients;
        mapping(uint => Patient) patients;
    }
   
    //Lista de pacientes
    uint public countPatients;
    mapping(address => Patient) public patients;
    mapping(address => mapping(address => Exam)) public patientsTransfers;

    //Lista de profissionais
    uint public countProfessionals;
    mapping(address => Professional) public professionals;
    mapping(address => mapping(address => Exam)) public professionalsTransfers;

    //eventos do paciente
    event AddPacientEvent (
        address indexed _patient,
        uint indexed _count
    );

    event AddExamToPatientEvent (
        address indexed _patient,
        bool indexed _addedExam
    );

    //eventos do profissional
    event AddProfessionalEvent (
        address indexed _professional,
        uint indexed _count
    );

    event ProfessionalAddExamToPatientEvent (
        address indexed _professional,
        address indexed _patient,
        bool indexed _addedExam
    );

    event PatientTransferExamToProfessionalEvent (
        address indexed _patient,
        address indexed _professional,
        bool indexed _addedExam
    );

    // funcoes do paciente
    function addPacient() public returns (bool success)  {
        uint count = countPatients++;
        patients[msg.sender] = Patient({owner: msg.sender, countExams: 0});
        emit AddPacientEvent(msg.sender, count);
        return true;
    }

    function addExamToPacient(string _ipfsHash) public returns (bool success)  {
        Patient storage p = patients[msg.sender];
        p.exams[p.countExams++] = Exam({ipfsHash: _ipfsHash});
        emit AddExamToPatientEvent(msg.sender, p.countExams > 0);
        return true;
    }

    function patientTransferExamToProfessional(address _professional, string _ipfsHash) public returns (bool success)  {
        patientsTransfers[msg.sender][_professional] = Exam({ipfsHash: _ipfsHash});
        
        Professional storage prof = professionals[msg.sender];
        prof.patients[prof.countPatients++] = Patient({owner: msg.sender, countExams: 0});
        Patient storage pat = patients[msg.sender];
        pat.exams[pat.countExams++] = Exam({ipfsHash: _ipfsHash});
        
        emit PatientTransferExamToProfessionalEvent(msg.sender, _professional, pat.countExams > 0);
        
        return true;
    }

    //funcoes do profissional
    function addProfessional() public returns (bool success)  {
        uint count = countProfessionals++;
        professionals[msg.sender] = Professional({owner: msg.sender, countPatients: 0});
        emit AddProfessionalEvent(msg.sender, count);
        return true;
    }

    function professionalAddExamToPatient(address _patient, string _ipfsHash) public returns (bool success)  {
        professionalsTransfers[msg.sender][_patient] = Exam({ipfsHash: _ipfsHash});
        
        Patient storage p = patients[msg.sender];
        p.exams[p.countExams++] = Exam({ipfsHash: _ipfsHash});
        
        emit ProfessionalAddExamToPatientEvent(msg.sender, _patient, p.countExams > 0);
        
        return true;
    }

}
