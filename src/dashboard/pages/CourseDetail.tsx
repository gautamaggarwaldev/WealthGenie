import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses } from "../data/courses";

// Example chapter data structure - you'll need to update your courses data to include chapters
interface Chapter {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  // Find the course by ID
  const course = courses.find((c) => c.id === courseId);

  // Example chapters - in a real app, this would come from your data
  const chapters: Chapter[] = [
    {
      id: "ch1",
      title: "Introduction",
      duration: "10 min",
      videoUrl:
        "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing",
      completed: true,
    },
    {
      id: "ch2",
      title: "Basic Concepts",
      duration: "15 min",
      videoUrl: "https://example.com/video2",
      completed: true,
    },
    {
      id: "ch3",
      title: "Advanced Techniques",
      duration: "20 min",
      videoUrl: "https://example.com/video3",
      completed: false,
    },
    {
      id: "ch4",
      title: "Practical Applications",
      duration: "25 min",
      videoUrl: "https://example.com/video4",
      completed: false,
    },
    {
      id: "ch5",
      title: "Final Project",
      duration: "30 min",
      videoUrl: "https://example.com/video5",
      completed: false,
    },
  ];

  if (!course) {
    return <div className="text-center p-8 text-white">Course not found</div>;
  }

  const handleChapterClick = (chapter: Chapter) => {
    setActiveChapter(chapter.id);
    // Open video in new tab
    window.open(chapter.videoUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <Button
            variant="outline"
            className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white cursor-pointer max-w-[120px] mx-auto sm:mx-0 sm:max-w-none sm:absolute sm:right-4 sm:top-4 whitespace-normal h-auto py-2"
            onClick={() => navigate("/dashboard/learning")}
          >
            Back to Learning Center
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Info */}
          <Card className="p-6 bg-gray-900/50 border-gray-800 md:col-span-1">
            <div className="space-y-4">
              <div className="text-4xl mb-2">{course.image}</div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {course.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      course.level === "Beginner"
                        ? "bg-green-500/20 text-green-400"
                        : course.level === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-100 text-sm mb-4">
                  {course.description}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-[#00D395]">{course.progress}%</span>
                </div>
                <Progress
                  value={course.progress}
                  className="bg-gray-800 [&>div]:bg-[#00D395]"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  <i className="far fa-clock mr-2"></i>
                  {course.duration}
                </span>
              </div>
            </div>
          </Card>

          {/* Chapters List */}
          <Card className="p-6 bg-gray-900/50 border-gray-800 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100">
              Course Chapters
            </h2>
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    activeChapter === chapter.id
                      ? "bg-[#00D395]/20 border-[#00D395]"
                      : "bg-gray-800/50 border-gray-700 hover:border-[#00D395]"
                  }`}
                  onClick={() => handleChapterClick(chapter)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          chapter.completed ? "bg-[#00D395]" : "bg-gray-100"
                        }`}
                      >
                        {chapter.completed ? (
                          <i className="fas fa-check text-xs"></i>
                        ) : (
                          <span className="text-xs">
                            {chapters.indexOf(chapter) + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-100">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {chapter.duration}
                        </p>
                      </div>
                    </div>
                    <div>
                      <i className="fas fa-play-circle text-[#00D395] text-xl"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
