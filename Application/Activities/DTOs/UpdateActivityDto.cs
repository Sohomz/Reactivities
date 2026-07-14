using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Application.Activities.DTOs
{
    public class UpdateActivityDto
    {
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public string Title { get; set; } = "";
        [Required]
        public DateTime Date { get; set; }
        
        [Required]
        public string Description { get; set; } = "";
        
        public string Category { get; set; } = "";

        //location props
        
        [Required]
        public string City { get; set; } = "";
        
        [Required]
        public string Venue { get; set; } = "";
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
    }
}
