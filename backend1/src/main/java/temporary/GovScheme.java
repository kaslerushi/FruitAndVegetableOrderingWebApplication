//package temporary;
//
//import java.time.LocalDate;
//import java.util.Set;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.Lob;
//import javax.persistence.Table;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotEmpty;
//
//import org.hibernate.validator.constraints.Length;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "gov_schemes")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//public class GovScheme extends BaseEntity{
//	
//	@NotBlank(message="must provide title")
//	@Column(length=40)
//	@Length(min=10,max=40)
//	private String title;
//	
//	@NotBlank(message="must described")
//	@Column(length=200)
//	@Length(min=20,max=200)
//	private String description;
//	
//	@NotEmpty(message="must set start date")
//	private String startDate;
//	
//	@NotEmpty(message="must set end date")
//	private String endDate;
//	
////	@NotBlank(message="url must be provided")
////	private String url;
//	
//	@NotEmpty(message="must provide any image")
//	@Lob
//	@Column(name="scheme_image")
//	private byte[] schemeImage;
//
//}
