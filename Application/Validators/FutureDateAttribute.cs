using System.ComponentModel.DataAnnotations;

namespace Application.Validators;

public class FutureDateAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        // 1. Check if the value is actually a DateTime object
        if (value is DateTime dateTime)
        {
            // 2. Compare it to the current time
            if (dateTime <= DateTime.Now)
            {
                // 3. Return error if the date is in the past or present
                // Use FormatErrorMessage to automatically pull your custom "ErrorMessage" string
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
            }
        }

        // Return success if it is a valid future date or if the value is null 
        // (Null validation should be handled separately by the [Required] attribute)
        return ValidationResult.Success;
    }
}
