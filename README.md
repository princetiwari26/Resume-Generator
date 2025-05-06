
# 📝 Resume Generator Website

🚀 **Live Demo**  
🔗 [Try the App Here](https://resume-generator-1-ag1w.onrender.com/)

---

## 📸 Screenshot  
_Image of Resume Generator Website_  
![Resume Generator Screenshot](https://imagizer.imageshack.com/img922/5028/0YMarM.png)

---

## 🌟 Key Features

✅ **Add/Edit/Delete Personal Details**: Effortlessly manage your Name, Email, Phone Number, and Address.  
✅ **Comprehensive Resume Sections**: Easily input your Summary, Educational background, Projects, and Work Experience.  
✅ **Skills & Certifications**: Showcase your expertise by adding your Skills, Certificates, and relevant Links.  
✅ **Downloadable PDFs**: Generate and download your complete resume in a professional, well-formatted PDF.  
✅ **Unique Resume ID**: A smart 6-digit alphanumeric ID system allows you to save and retrieve your resume data.  
✅ **Cross-Device Access**: Retrieve your resume data from any device using the unique 6-digit ID.  
✅ **Search Functionality**: Enter a valid ID to automatically populate all resume fields with previously saved data, even from another device or session.

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ React.js  
- 🚀 Next.js  
- 🎨 Tailwind CSS  
- 🔗 Axios  
- 📄 jsPDF  
- 📊 jsPDF-AutoTable  

### **Backend**
- 🟢 Node.js  
- 🧩 Express.js  
- 🆔 nanoid  
- 🌐 CORS  
- ⚙️ dotenv  

### **Database**
- 🗄️ MongoDB (via MongoDB Atlas & Mongoose)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/princetiwari26/Resume-Generator
cd Resume-Generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the application

```bash
npm run dev
```

Open your browser and navigate to:  
[http://localhost:3000](http://localhost:3000)

---

## 📌 Important Notes

- **Unique ID Generation**: Uses `nanoid` to create a compact and URL-friendly 6-digit alphanumeric ID for each resume.  
- **PDF Generation**: Uses `jsPDF` and `jsPDF-AutoTable` to generate well-structured resume PDFs on the client-side.  
- **Cross-Origin Requests**: `CORS` is enabled on the backend to allow frontend requests.  
- **Environment Variables**: `dotenv` is used to manage environment variables and keep sensitive data secure.

---

## 📬 Contact

If you have any feedback or suggestions, feel free to connect with me or open an issue.