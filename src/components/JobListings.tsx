import { Card, CardContent } from "@/components/ui/card";

interface Job {
  id: string;
  title: string;
  department: string;
  description: string;
}

const jobsData: Job[] = [
  {
    id: "1",
    title: "Lễ tân",
    department: "Đón tiếp khách hàng",
    description: "Đón tiếp khách hàng và hỗ trợ các hoạt động văn phòng",
  },
  {
    id: "2",
    title: "Digital Marketing",
    department: "Chiến lược marketing số",
    description: "Phát triển và thực hiện các chiến lược marketing số",
  },
  {
    id: "3",
    title: "Chuyên viên mua hàng",
    department: "Quản lý mua sắm",
    description: "Quản lý và thực hiện các hoạt động mua sắm, đàm phán",
  },
  {
    id: "4",
    title: "Kiểm soát kinh doanh",
    department: "Giám sát hoạt động",
    description: "Giám sát và kiểm soát các hoạt động kinh doanh",
  },
  {
    id: "5",
    title: "Admin",
    department: "Quản lý hành chính",
    description: "Quản lý và hỗ trợ các hoạt động hành chính",
  },
];

const JobListings = () => {
  const handleCardClick = () => {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Vị Trí Đang Tuyển</h2>
          <p className="text-muted-foreground text-lg">
            Gia nhập đội ngũ của chúng tôi
          </p>
        </div>

        <div className="space-y-3">
          {jobsData.map((job, index) => {
            const leafClass = 'rounded-[3rem_0rem_3rem_0rem]';
            const shadowClass = 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)]';
            
            return (
              <div key={job.id} className="relative">
                {/* Leaf shadow */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gray-200 ${leafClass} transform translate-x-2 translate-y-2 z-0`}></div>
                
                {/* Main card */}
                <div 
                  onClick={handleCardClick}
                  className={`bg-white ${leafClass} ${shadowClass} hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer group relative z-10 overflow-hidden`}
                >
                  {/* Leaf shape decoration */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-bl-full"></div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-3 items-center">
                      {/* Position */}
                      <div className="md:col-span-3">
                        <p className="text-xs text-muted-foreground mb-1">Vị trí</p>
                        <h3 className="text-lg font-semibold group-hover:text-[#c9184a] transition-colors duration-300">{job.title}</h3>
                      </div>

                      {/* Department */}
                      <div className="md:col-span-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Khối / Trung tâm
                        </p>
                        <p className="text-sm group-hover:text-[#c9184a] transition-colors duration-300">{job.department}</p>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          Mô tả công việc
                        </p>
                        <p className="text-sm group-hover:text-[#c9184a] transition-colors duration-300">{job.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
